"use server";
import { query } from "../connect-db";

enum ROLE {
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
}

type table = "WORKER-pkm" | "USER-pkm" | "QR-CODE-pkm"

export async function createTable(table: table) {
  if (!process.env.DATABASE_URL) {
    console.error("Database URL is missing!");
    return "Database URL is missing in the environment variables.";
  }

  try {
    const createTableQueries = {
      'USER-pkm': `
        CREATE TABLE IF NOT EXISTS "USER-pkm" (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          role role_enum,
          phone INT(10),
          image_url TEXT
        )
      `,
      'WORKER-pkm': `
        CREATE TABLE IF NOT EXISTS "WORKER-pkm" (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) REFERENCES "USER-pkm" (id) ON DELETE CASCADE,
          "qr-code" VARCHAR(255) REFERENCES "QR-CODE-pkm" (code) ON DELETE CASCADE,
          "qty-in" INT DEFAULT 0,
          "qty-out" INT DEFAULT 0,
          date DATE
        )
      `,
      'QR-CODE-pkm': `
        CREATE TABLE IF NOT EXISTS "QR-CODE-pkm" (
          code VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255),
          "pck-size" INT
        )
      `
    };
    if (table === "USER-pkm") {
      await query(`
          CREATE TYPE role_enum AS ENUM ('Manager', 'Worker');
        `);
    }

    const result = await query(createTableQueries[table]);
    return { message: `Table ${table} created successfully.`, result }; // Returning a more structured response

  } catch (error) {
    console.error("Error creating table:", error);
    return `An error occurred while creating the table: ${error}`;
  }
}

export async function createUser(data: userInfo) {
  try {
    const result = await query(`
      INSERT INTO "user-pkm" (id, name, email, role, phone, image_url)
      VALUES (${data.id}, ${data.name}, ${data.email}, ${data.role}, ${data.phone} , ${data.image_url})
    `);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return `An error occurred while creating the user: ${error}`;
  }
}

export async function deleteUser(id: string) {
  try {
    const result = await query(`DELETE FROM "user-pkm" WHERE id = ${id}`);
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    return `An error occurred while deleting the user: ${error}`;
  }
}
