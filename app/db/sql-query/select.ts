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
