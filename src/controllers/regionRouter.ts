import express, { Request, RequestHandler, Response } from 'express';
require('express-async-errors');

import prisma from '../client';
import { checkPermissions } from '../middlewares/permissions.middleware';
import regionService from '../services/regionService';
import { NewRegionEntry, RegionsPermission } from '../types';

const regionRouter = express.Router();

regionRouter.get('/', checkPermissions(RegionsPermission.ReadRegions), (async (
  _req: Request,
  res: Response
) => {
  try {
    const regions = await regionService.getRegions();
    res.json({ success: true, data: regions });
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + errorMessage;
    }
    res
      .status(500)
      .json({ success: false, message: errorMessage, data: error });
  }
}) as RequestHandler);

regionRouter.get(
  '/:id',
  checkPermissions(RegionsPermission.ReadRegions),
  (async (req, res) => {
    try {
      const region = await regionService.findById(req.params.id);
      if (region) {
        res.json({
          success: true,
          message: `Region with id: ${region.id} found`,
          data: region,
        });
      } else {
        res.status(404).json({ success: false, message: 'Region not found' });
      }
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(404)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

regionRouter.post(
  '/',
  checkPermissions(RegionsPermission.CreateRegions),
  (async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const body = req.body as NewRegionEntry[];
        const bulkRegion = await regionService.addBulkRegion(body);
        res.status(201).json({
          success: true,
          message: `Regions (${bulkRegion.total.count}) created successfully`,
          data: bulkRegion,
        });
      } else {
        const data = [];
        data.push(req.body);
        const body = data as NewRegionEntry[];
        const bulkRegion = await regionService.addBulkRegion(body);
        res.status(201).json({
          success: true,
          message: `Regions (${bulkRegion.total.count}) created successfully`,
          data: bulkRegion,
        });
      }
    } catch (error) {
      let errorMessage = 'Adding Region failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

regionRouter.post(
  '/:id',
  checkPermissions(RegionsPermission.CreateRegions),
  (async (req: Request, res: Response) => {
    try {
      if (req.params.id !== req.body.id) {
        res.status(400).json({
          success: false,
          message: `Region id in the request ${req.params.id} is different from the body ${req.body.id}`,
        });
      } else {
        const addedRegion = await regionService.addRegion(
          req.body as NewRegionEntry
        );
        if (addedRegion) {
          res.status(201).json({
            success: true,
            message: `Region created successfully`,
            data: addedRegion,
          });
        }
      }
    } catch (error) {
      let errorMessage = 'Adding Region failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

regionRouter.delete(
  '/:id',
  checkPermissions(RegionsPermission.DeleteRegions),
  (async (req: Request, res: Response) => {
    try {
      await prisma.region.delete({ where: { id: req.params.id } });
      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: 'Something went wrong.', data: error });
    }
  }) as RequestHandler
);

export default regionRouter;
