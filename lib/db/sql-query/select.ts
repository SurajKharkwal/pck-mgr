"use server"
import { query } from "../connect-db";

export async function getCount() {
  try {
    const result = await query(`
      Select count(*) from "USER-pkm";
    `)
    return result.rows[0].count;
  } catch (error) {
    console.error("Error deleting user:", error);
    return `An error occurred while deleting the user: ${error}`;
  }
}
export async function getQrCode(code: string) {
  try {
    const result = await query(
      `
      SELECT * FROM "QR-CODE-pkm" WHERE code = $1;
      `,
      [code]
    );
    if (result.rows.length === 0) {
      console.warn("No QR code found for the given code.");
      return null;
    }
    console.log(result.rows)
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching QR code details:", error);
    throw new Error("An error occurred while fetching the QR code details.");
  }
}

