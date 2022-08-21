import express, { Request, RequestHandler, Response } from 'express';

import prisma from '../client';
import { checkPermissions } from '../middlewares/permissions.middleware';
import voterService from '../services/voterService';
import { NewVoterEntry, VotersPermission } from '../types';

const voterRouter = express.Router();

voterRouter.get('/', checkPermissions(VotersPermission.ReadVoters), (async (
  _req: Request,
  res: Response
) => {
  try {
    const voters = await voterService.getVoters();
    res.json({ success: true, data: voters });
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

voterRouter.get('/:id', checkPermissions(VotersPermission.ReadVoters), (async (
  req,
  res
) => {
  try {
    const voter = await voterService.findById(req.params.id);
    if (voter) {
      res.json({
        success: true,
        message: `Voter with id: ${voter.id} found`,
        data: voter,
      });
    } else {
      res.status(404).json({ success: false, message: 'Voter not found' });
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
}) as RequestHandler);

voterRouter.post('/', checkPermissions(VotersPermission.CreateVoters), (async (
  req,
  res
) => {
  try {
    if (Array.isArray(req.body)) {
      const body = req.body as NewVoterEntry[];
      const bulkVoter = await voterService.addBulkVoter(body);
      res.status(201).json({
        success: true,
        message: `Voters (${bulkVoter.total.count}) created successfully`,
        data: bulkVoter,
      });
    } else {
      const data = [];
      data.push(req.body);
      const body = data as NewVoterEntry[];
      const bulkVoter = await voterService.addBulkVoter(body);
      res.status(201).json({
        success: true,
        message: `Voters (${bulkVoter.total.count}) created successfully`,
        data: bulkVoter,
      });
    }
  } catch (error) {
    let errorMessage = 'Adding Voter failed, Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res
      .status(400)
      .json({ success: false, message: errorMessage, data: error });
  }
}) as RequestHandler);

voterRouter.post(
  '/:id',
  checkPermissions(VotersPermission.CreateVoters),
  (async (req: Request, res: Response) => {
    try {
      if (req.params.id !== req.body.id) {
        res.status(400).json({
          success: false,
          message: `Voter id in the request ${req.params.id} is different from the body ${req.body.id}`,
        });
      } else {
        const addedVoter = await voterService.addVoter(
          req.body as NewVoterEntry
        );
        if (addedVoter) {
          res.status(201).json({
            success: true,
            message: `Voter created successfully`,
            data: addedVoter,
          });
        }
      }
    } catch (error) {
      let errorMessage = 'Adding Voter failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

voterRouter.delete(
  '/:id',
  checkPermissions(VotersPermission.DeleteVoters),
  (async (req: Request, res: Response) => {
    try {
      await prisma.voter.delete({ where: { id: req.params.id } });
      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: 'Something went wrong.', data: error });
    }
  }) as RequestHandler
);

export default voterRouter;
