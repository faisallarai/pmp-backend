import express, { Request, RequestHandler, Response } from 'express';
require('express-async-errors');

import prisma from '../client';
import { checkPermissions } from '../middlewares/permissions.middleware';
import constituencyService from '../services/constituencyService';
import { ConstituenciesPermission, NewConstituencyEntry } from '../types';

const constituencyRouter = express.Router();

constituencyRouter.get(
  '/',
  checkPermissions(ConstituenciesPermission.ReadConstituencies),
  (async (_req: Request, res: Response) => {
    try {
      const constituencies = await constituencyService.getConstituencies();
      res.json({ success: true, data: constituencies });
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        errorMessage += 'Error: ' + errorMessage;
      }
      res
        .status(500)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

constituencyRouter.get(
  '/:id',
  checkPermissions(ConstituenciesPermission.ReadConstituencies),
  (async (req, res) => {
    try {
      const constituency = await constituencyService.findById(req.params.id);
      if (constituency) {
        res.json({
          success: true,
          message: `Constituency with id: ${constituency.id} found`,
          data: constituency,
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: 'Constituency not found' });
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

constituencyRouter.post(
  '/',
  checkPermissions(ConstituenciesPermission.CreateConstituencies),
  (async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const body = req.body as NewConstituencyEntry[];
        const bulkConstituency = await constituencyService.addBulkConstituency(
          body
        );
        res.status(201).json({
          success: true,
          message: `Constituencies (${bulkConstituency.total.count}) created successfully`,
          data: bulkConstituency,
        });
      } else {
        const data = [];
        data.push(req.body);
        const body = data as NewConstituencyEntry[];
        const bulkConstituency = await constituencyService.addBulkConstituency(
          body
        );
        res.status(201).json({
          success: true,
          message: `Constituencies (${bulkConstituency.total.count}) created successfully`,
          data: bulkConstituency,
        });
      }
    } catch (error) {
      let errorMessage = 'Adding Constituency failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

constituencyRouter.post(
  '/:id',
  checkPermissions(ConstituenciesPermission.CreateConstituencies),
  (async (req: Request, res: Response) => {
    try {
      if (req.params.id !== req.body.id) {
        res.status(400).json({
          success: false,
          message: `Constituency id in the request ${req.params.id} is different from the body ${req.body.id}`,
        });
      } else {
        const addedConstituency = await constituencyService.addConstituency(
          req.body as NewConstituencyEntry
        );
        if (addedConstituency) {
          res.status(201).json({
            success: true,
            message: `Constituency created successfully`,
            data: addedConstituency,
          });
        }
      }
    } catch (error) {
      let errorMessage = 'Adding Constituency failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

constituencyRouter.delete(
  '/:id',
  checkPermissions(ConstituenciesPermission.DeleteConstituencies),
  (async (req: Request, res: Response) => {
    try {
      await prisma.constituency.delete({ where: { id: req.params.id } });
      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: 'Something went wrong.', data: error });
    }
  }) as RequestHandler
);

export default constituencyRouter;
