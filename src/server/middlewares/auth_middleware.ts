import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { isString } from 'lodash';
import { JWTPayload } from '../controllers/login_controller';

/**
 * Validates a request by checking the header `x-access-token`. If it is a valid
 * JSON web token we add the decoded id to `response.local`, so that the next
 * functions in the chain know which user made the request.
 * @param request 
 * @param response 
 * @param next 
 */
export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  let token = request.headers['x-access-token'];

  if (!token || !isString(token)) {
    return response.status(401).send({ auth: false, message: 'No token provided, set header x-access-token' });
  }

  jwt.verify(token, config.jwtSecret, (error, decoded: JWTPayload) => {
    if (error) {
      return response.status(401).send({ auth: false, message: 'Invalid token' });
    }

    // Set userId to `locals` for use in controller functions
    response.locals.id = decoded.id;

    next();
  });
};
