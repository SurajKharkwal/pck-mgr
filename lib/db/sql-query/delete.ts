"use server"

import { query } from "../connect-db";


export async function deleteUser(id: string) {
  try {
    const result = await query(`DELETE FROM "USER-pkm" WHERE id = ${id}`);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    return `An error occurred while deleting the user: ${error}`;
  }
}
