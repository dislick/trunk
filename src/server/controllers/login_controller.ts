import { Request, Response } from 'express';
import { registerUserInDatabase, validateUser } from '../models/user_model';
import { isString } from 'lodash';
import { DuplicateEntryError } from '../utils/error';
import * as jwt from 'jsonwebtoken';
import { config } from '../config';
import { isInviteValid, claimInviteCode } from '../models/invite_model';

export interface JWTPayload {
  id: number;
}

export interface ValidationResponseDTO {
  isValid: boolean;
  username?: string;
}

/**
 * API Endpoint POST /login 
 */
export const loginUser = async (request: Request, response: Response) => {
  let { username, password } = request.body;

  if (!isString(username) || !isString(password)) {
    return response.status(400).send({ auth: false });
  }

  try {
    var { isPasswordCorrect, userId } = await validateUser(username, password);
  } catch (error) {
    return response.status(401).send({
      auth: false,
      message: 'Incorrect credentials'
    });
  }

  if (isPasswordCorrect) {
    let token = generateJWT(userId);
    response.cookie(config.jwtCookieName, token, {
      httpOnly: true,
      maxAge: 86400000,
    });
    response.send({
      auth: true,
      token: token,
    });
  } else {
    response.status(401).send({
      auth: false,
      message: 'Incorrect credentials'
    });
  }
};

export const logoutUser = async (request: Request, response: Response) => {
  response.clearCookie(config.jwtCookieName);
  response.send({ auth: false });
};

/**
 * API Endpoint POST /register 
 */
export const registerUser = async (request: Request, response: Response) => {
  const { username, email, password } = request.body;
  const { inviteCode } = request.params;

  // Basic validation
  if (!isString(username) || username.length < 3 || username.length > 64) {
    return response.status(400).send({ message: 'Username must be between 3 and 64 chars' });
  }
  if (!isString(email) || email.length < 3 || email.length > 128 || email.indexOf('@') === -1) {
    return response.status(400).send({ message: 'Email must be between 3 and 128 chars and contain a @-character' });
  }
  if (!isString(password) || password.length < 8 || password.length > 72) {
    return response.status(400).send({ message: 'Password must be between 8 and 72 characters' });
  }

  try {
    let { isValid } = await isInviteValid(inviteCode);

    if (!isValid) {
      return response.status(401).send({ auth: false, message: 'Invalid invite code' });
    }

    let newUser = await registerUserInDatabase(username, email, password);
    await claimInviteCode(inviteCode, newUser.id);

    let token = generateJWT(newUser.id);
    response.cookie(config.jwtCookieName, token, {
      httpOnly: true,
      maxAge: 86400000,
    });
    response.status(200).send({
      auth: true,
      token: token,
    });
  } catch (error) {
    if (error instanceof DuplicateEntryError) {
      return response.status(400).send({ message: 'Username or email already exists' });
    }
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};

export const validateCode = async (request: Request, response: Response) => {
  const { inviteCode } = request.params;

  let validationResponse = await isInviteValid(inviteCode);

  // Artificial delay to stop attackers from bruteforcing invites
  setTimeout(() => {
    response.send(validationResponse);
  }, 1000);
};

/**
 * Generate a JSON Web Token.
 * @param userId ID of the user
 */
const generateJWT = (userId: number): string => {
  let payload: JWTPayload = { id: userId };
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: 86400 // 24h in seconds
  });
};
