import { Request, Response } from 'express';
import { registerUserInDatabase } from '../models/user_model';
import { isString } from 'lodash';
import { DuplicateEntryError } from '../utils/error';

export const loginUser = (request: Request, response: Response) => {
  response.send('hello!!');
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
    console.log(result);
  } catch (error) {
    if (error instanceof DuplicateEntryError) {
      return response.status(400).send();
    }
    return response.status(500).send();
  }

  response.send({ __status: 200 });
};