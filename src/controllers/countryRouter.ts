import express, { Request, RequestHandler, Response } from 'express';

import prisma from '../client';
import { checkPermissions } from '../middlewares/permissions.middleware';
import countryService from '../services/countryService';
import { CountriesPermission, NewCountryEntry } from '../types';

const countryRouter = express.Router();

countryRouter.get(
  '/',
  checkPermissions(CountriesPermission.ReadCountries),
  (async (_req: Request, res: Response) => {
    try {
      const countries = await countryService.getCountries();
      res.json({ success: true, data: countries });
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

countryRouter.get(
  '/:id',
  checkPermissions(CountriesPermission.ReadCountries),
  (async (req: Request, res: Response) => {
    try {
      const country = await countryService.findById(req.params.id);
      if (country) {
        res.json({
          success: true,
          message: `Country with id: ${country.id} found`,
          data: country,
        });
      } else {
        res.status(404).json({ success: false, message: 'Country not found' });
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

countryRouter.post(
  '/',
  checkPermissions(CountriesPermission.CreateCountries),
  (async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const body = req.body as NewCountryEntry[];
        const bulkCountry = await countryService.addBulkCountry(body);
        res.status(201).json({
          success: true,
          message: `Countries (${bulkCountry.total.count}) created successfully`,
          data: bulkCountry,
        });
      } else {
        const data = [];
        data.push(req.body);
        const body = data as NewCountryEntry[];
        const bulkCountry = await countryService.addBulkCountry(body);
        res.status(201).json({
          success: true,
          message: `Countries (${bulkCountry.total.count}) created successfully`,
          data: bulkCountry,
        });
      }
    } catch (error) {
      let errorMessage = 'Adding Country failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

countryRouter.post(
  '/:id',
  checkPermissions(CountriesPermission.CreateCountries),
  (async (req: Request, res: Response) => {
    try {
      if (req.params.id !== req.body.id) {
        res.status(400).json({
          success: false,
          message: `Country id in the request ${req.params.id} is different from the body ${req.body.id}`,
        });
      } else {
        const addedCountry = await countryService.addCountry(
          req.body as NewCountryEntry
        );
        if (addedCountry) {
          res.status(201).json({
            success: true,
            message: `Country created successfully`,
            data: addedCountry,
          });
        }
      }
    } catch (error) {
      let errorMessage = 'Adding Country failed, Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res
        .status(400)
        .json({ success: false, message: errorMessage, data: error });
    }
  }) as RequestHandler
);

countryRouter.delete(
  '/:id',
  checkPermissions(CountriesPermission.DeleteCountries),
  (async (req: Request, res: Response) => {
    try {
      await prisma.country.delete({ where: { id: req.params.id } });
      return res.status(204).end();
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: 'Something went wrong.', data: error });
    }
  }) as RequestHandler
);

export default countryRouter;
