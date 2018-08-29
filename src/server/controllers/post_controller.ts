import { Request, Response } from 'express';

export const getPosts = async (request: Request, response: Response) => {
  response.send({ userId: response.locals });
};
