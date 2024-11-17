"use server";
import { auth } from "@clerk/nextjs/server";
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
export async function enterQrCode(data: { code: string, packageIn: number, packageOut: number }[]) {
  const { userId } = await auth(); // Get the userId from the authenticated user

  try {
    // Prepare the values and query placeholders
    const values: any = [];
    const queryString = `
      INSERT INTO "WORKER-pkm" ("user_id", "qr-code", "qty-in", "qty-out")
      VALUES
      ${data
        .map((item, index) => {
          // Push the values into the values array
          const paramIndex = index * 4;  // 4 parameters per row
          values.push(userId, item.code, item.packageIn, item.packageOut);  // Add data for each row
          return `($${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4})`; // Create placeholders for each row
        })
        .join(', ')}
    `;

    // Execute the query with the values
    await query(queryString, values);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error("Error inserting QR code data:", error);
    return `An error occurred while inserting QR code data: ${error}`;
  }
}

