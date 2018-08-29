import { pool } from "./database";

export interface InviteModel {
  invite_code: string;
  from_user: number;
  is_claimed: boolean;
  claimed_at?: Date;
  claimed_by?: number;
}

export const isInviteValid = async (inviteCode: string): Promise<boolean> => {
  const query = `SELECT * FROM invite WHERE invite_code = $1 AND is_claimed = FALSE`;

  let result = await pool.query(query, [inviteCode]);

  if (result.rows.length <= 0) {
    return false;
  }

  let inviteModel = result.rows[0];
  return !inviteModel.is_claimed;
};

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
