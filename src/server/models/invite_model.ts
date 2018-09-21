import { pool } from "./database";

export interface InviteModel {
  invite_code: string;
  from_user: number;
  is_claimed: boolean;
  claimed_at?: Date;
  claimed_by?: number;
}

export const isInviteValid = async (inviteCode: string): Promise<{ isValid: boolean; username?: string }> => {
  const query = `
    SELECT
      invite.is_claimed,
      u.username
    FROM invite
    INNER JOIN "user" u on invite.from_user = u.id
    WHERE invite.invite_code = $1 AND invite.is_claimed = FALSE`;

  let result = await pool.query(query, [inviteCode]);

  if (result.rows.length <= 0) {
    return { isValid: false };
  }

  let inviteModel = result.rows[0];
  return {
    isValid: !inviteModel.is_claimed, 
    username: inviteModel.username
  };
}

export const claimInviteCode = async (inviteCode: string, claimedBy: number) => {
  const query = `
    UPDATE "invite" 
    SET 
      is_claimed = true, 
      claimed_at = now(), 
      claimed_by = $2
    WHERE invite_code = $1`;

  await pool.query(query, [inviteCode, claimedBy])
};
