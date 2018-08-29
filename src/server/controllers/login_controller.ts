import { Request, Response } from 'express';
import { registerUserInDatabase, validateUser } from '../models/user_model';
import { isString } from 'lodash';
import { DuplicateEntryError } from '../utils/error';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JWTPayload {
  id: number;
}

export const loginUser = async (request: Request, response: Response) => {
  let { username, password } = request.body;

  if (!isString(username) || !isString(password)) {
    return response.status(400).send();
  }

  let { isPasswordCorrect, userId } = await validateUser(username, password);

  if (isPasswordCorrect) {
    let token = generateJWT(userId);
    response.send({
      auth: true,
      token: token,
    })
  } else {
    response.status(401).send({
      auth: false,
      message: 'Incorrect credentials'
    });
  }
};

export const registerUser = async (request: Request, response: Response) => {
  let { username, email, password } = request.body;

  // Basic validation
  if (!isString(username) || username.length < 3 || username.length > 64) {
    return response.status(400).send();
  }
  if (!isString(email) || email.length < 3 || email.length > 128 || email.indexOf('@') === -1) {
    return response.status(400).send();
  }
  if (!isString(password) || password.length < 8 || password.length > 72) {
    return response.status(400).send();
  }

  try {
    let result = await registerUserInDatabase(username, email, password);
    let token = generateJWT(result.id);

    response.status(200).send({
      auth: true,
      token: token,
    });
  } catch (error) {
    if (error instanceof DuplicateEntryError) {
      return response.status(400).send();
    }
    return response.status(500).send();
  }
};

const generateJWT = (userId: number): string => {
  // Generate JSON Web Token
  let payload: JWTPayload = { id: userId };
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: 86400 // 24h in seconds
  });
};
