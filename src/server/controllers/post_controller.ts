import { Request, Response } from 'express';

/**
 * API Endpoint GET /posts 
 */
export const getPosts = async (request: Request, response: Response) => {
  response.send({ userId: response.locals });
};
