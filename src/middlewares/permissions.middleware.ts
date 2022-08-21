import jwtAuthz from 'express-jwt-authz';
import logger from '../utils/logger';

export const checkPermissions = (permissions: string) => {
  console.log('permissionsoo', permissions);
  logger.debug(permissions);
  return jwtAuthz([permissions], {
    customScopeKey: 'permissions',
    customUserKey: 'auth',
    checkAllScopes: true,
    failWithError: true,
  });
};
