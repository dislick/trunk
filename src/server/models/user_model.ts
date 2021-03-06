import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { config } from '../config';
import { UserLevel } from '../enums/level_enum';
import { DuplicateEntryError, NotFoundError } from '../utils/error';
import { pool } from './database';

export interface UserModel {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  torrent_auth_key: string;
  level: number;
  total_uploaded: string;
  total_downloaded: string;
}

/**
 * Registers a new user in the database. Make sure that the values provided here
 * have been checked for validity and that the user has a valid invite code!
 * @param username Name of the user
 * @param email Email of the user
 * @param password Password in plain text
 */
export const registerUserInDatabase = async (username: string, email: string, password: string): Promise<UserModel> => {
  // Hash password with bcrypt
  const hash = await bcrypt.hash(password, config.bcryptRounds);

  // Generate torrent_auth_key. This is mostly random by hashing some user
  // provided values with a random string and the current time.
  const shaHash = crypto.createHash('sha1');
  const torrentAuthKey: string = shaHash.update(
    username + email + Math.random().toString() + Date.now().toString(),
  ).digest('hex');

  // Insert into database
  const query = `
    INSERT INTO "user" (username, email, password_hash, torrent_auth_key, level)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id`;

  try {
    let result = await pool.query(query, [
      username,
      email,
      hash,
      torrentAuthKey,
      UserLevel.NORMAL,
    ]);

    return {
      id: result.rows[0].id,
      username,
      email,
      password_hash: hash,
      torrent_auth_key: torrentAuthKey,
      level: UserLevel.NORMAL,
      total_downloaded: null,
      total_uploaded: null,
    };
  } catch (ex) {
    throw new DuplicateEntryError('Username or email already exists');
  }
};

/**
 * Find a user in the database using an ID.
 * @param userId
 */
export const findUser = async (userId: number): Promise<UserModel> => {
  const query = `
    SELECT * from "user" WHERE id = $1`;

  let result = await pool.query(query, [userId]);

  if (result.rows.length <= 0) {
    throw new NotFoundError('User not found');
  }

  return result.rows[0];
};

/**
 * Find a user in the database using his torrent key.
 * @param userId
 */
export const findUserByTorrentKey = async (torrentKey: string): Promise<UserModel> => {
  const query = `
    SELECT * from "user" WHERE torrent_auth_key = $1`;

  let result = await pool.query(query, [torrentKey]);

  if (result.rows.length <= 0) {
    throw new NotFoundError('User not found');
  }

  return result.rows[0];
};

/**
 * Validates a user identification string (either username or email) against the
 * database with a given password.
 * @param userIdentification Username or Email
 * @param password Password
 */
export const validateUser = async (
  userIdentification: string,
  password: string,
): Promise<{ isPasswordCorrect: boolean, userId: number }> => {
  let field = 'username';

  // If there is a @ character present we switch the field to `email`
  if (userIdentification.indexOf('@') !== -1) {
    field = 'email';
  }

  const query = `SELECT * from "user" WHERE ${field} = $1`;

  let result = await pool.query(query, [userIdentification]);

  if (result.rows.length <= 0) {
    throw new NotFoundError('User not found');
  }

  let user: UserModel = result.rows[0];

  return {
    isPasswordCorrect: await bcrypt.compare(password, user.password_hash),
    userId: user.id,
  };
};
