import express, { Request, RequestHandler, Response } from 'express';
require('express-async-errors');

import prisma from '../client';
import { checkPermissions } from '../middlewares/permissions.middleware';
import pollingStationService from '../services/pollingStationService';
import { NewPollingStationEntry, PollingStationsPermission } from '../types';

const pollingStationRouter = express.Router();

pollingStationRouter.get(
  '/',
  checkPermissions(PollingStationsPermission.ReadPollingStations),
  (async (_req: Request, res: Response) => {
    try {
      const pollingStations = await pollingStationService.getPollingStations();
      res.json({ success: true, data: pollingStations });
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

pollingStationRouter.get(
  '/:id',
  checkPermissions(PollingStationsPermission.ReadPollingStations),
  (async (req, res) => {
    try {
      const pollingStation = await pollingStationService.findById(
        req.params.id
      );
      if (pollingStation) {
        res.json({
          success: true,
          message: `PollingStation with id: ${pollingStation.id} found`,
          data: pollingStation,
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: 'PollingStation not found' });
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

pollingStationRouter.post(
  '/',
  checkPermissions(PollingStationsPermission.CreatePollingStations),
  (async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const body = req.body as NewPollingStationEntry[];
        const bulkPollingStation =
          await pollingStationService.addBulkPollingStation(body);
        res.status(201).json({
          success: true,
          message: `PollingStations (${bulkPollingStation.total.count}) created successfully`,
          data: bulkPollingStation,
        });
      } else {
        const data = [];
        data.push(req.body);
        const body = data as NewPollingStationEntry[];
        const bulkPollingStation =
          await pollingStationService.addBulkPollingStation(body);
        res.status(201).json({
          success: true,
          message: `PollingStations (${bulkPollingStation.total.count}) created successfully`,
          data: bulkPollingStation,
        });
      }
    } catch (error) {
      let errorMessage = 'Adding PollingStation failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

pollingStationRouter.post(
  '/:id',
  checkPermissions(PollingStationsPermission.CreatePollingStations),
  (async (req: Request, res: Response) => {
    try {
      if (req.params.id !== req.body.id) {
        res.status(400).json({
          success: false,
          message: `PollingStation id in the request ${req.params.id} is different from the body ${req.body.id}`,
        });
      } else {
        const addedPollingStation =
          await pollingStationService.addPollingStation(
            req.body as NewPollingStationEntry
          );
        if (addedPollingStation) {
          res.status(201).json({
            success: true,
            message: `PollingStation created successfully`,
            data: addedPollingStation,
          });
        }
      }
    } catch (error) {
      let errorMessage = 'Adding PollingStation failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

pollingStationRouter.delete(
  '/:id',
  checkPermissions(PollingStationsPermission.DeletePollingStations),
  (async (req: Request, res: Response) => {
    try {
      await prisma.pollingStation.delete({ where: { id: req.params.id } });
      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: 'Something went wrong.', data: error });
    }
  }) as RequestHandler
);

export default pollingStationRouter;
