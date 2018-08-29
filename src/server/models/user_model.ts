import * as bcrypt from 'bcrypt';
import { config } from '../config';
import { pool } from './database';
import * as crypto from 'crypto';
import { DuplicateEntryError } from '../utils/error';
import { UserLevel } from '../enums/level_enum';

/**
 * Registers a new user in the database. Make sure that the values provided here
 * have been checked for validity.
 * @param username Name of the user
 * @param email Email of the user
 * @param password Password in plain text
 */
export const registerUserInDatabase = async (username: string, email: string, password: string): Promise<{ id: number, torrentAuthKey: string }> => {
  // Hash password with bcrypt
  const hash = await bcrypt.hash(password, config.bcryptRounds);

  // Generate torrent_auth_key. This is mostly random by hashing some user
  // provided values with a random string and the current date.
  const shaHash = crypto.createHash('sha1');
  const torrentAuthKey: string = shaHash.update(
    username + email + Math.random().toString() + Date.now().toString()
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
      torrentAuthKey: torrentAuthKey,
    };
  } catch (ex) {
    throw new DuplicateEntryError('Username or email already exists');
  }
};
