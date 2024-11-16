"use server";
import { query } from "../connect-db";
import { randomUUID } from "crypto"; // Built-in in Node.js

type Data = { name: string; pckSize: number }; enum ROLE {
  Manager = "Manager",
  Worker = "Worker",
}

type userInfo = {
  id: string;
  name: string;
  email: string;
  role: ROLE;
  phone: number;
  image_url: string;
};

export async function createQrCode(data: Data) {
  try {
    const uniqueCode = randomUUID();
    console.log(uniqueCode)
    const queryText = `
      INSERT INTO "QR-CODE-pkm" (code, name, "pck-size")
      VALUES ($1, $2, $3)
      RETURNING code
    `;

    const values = [uniqueCode, data.name, data.pckSize];
    console.log(uniqueCode)

    const result = await query(queryText, values);
    return { success: true, qrCode: result.rows[0]?.code };
  } catch (error) {
    console.error("Error creating QR code:", error);
    throw new Error("Failed to create QR code.");
  }
}

export async function createUser(data: userInfo) {
  try {
    const result = await query(`
      INSERT INTO "USER-pkm" (id, name, email, role, phone, image_url)
      VALUES ('${data.id}', '${data.name}', '${data.email}', '${data.role}', ${data.phone}, '${data.image_url}')
    `);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return `An error occurred while creating the user: ${error}`;
  }
}
