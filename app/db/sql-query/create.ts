"use server";
import { neon } from "@neondatabase/serverless";

export enum ROLE {
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

export async function createTable(table: 'user-pkm' | 'worker-pkm') {

  if (!process.env.DATABASE_URL) {
    console.error("Database URL is missing!");
    return "Database URL is missing in the environment variables.";
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const createTableQueries = {
      'user-pkm': `
        CREATE TABLE IF NOT EXISTS "user-pkm" (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          role role_enum,
          phone INT,
          image_url TEXT
        )
      `,
      'worker-pkm': `
        CREATE TABLE IF NOT EXISTS "worker-pkm" (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) REFERENCES "user-pkm" (id) ON DELETE CASCADE,
          date DATE,
          pck_out_count INT, 
          pck_int_count INT,
          pck_out_arr TEXT[],  
          pck_int_arr TEXT[]
        )
      `,
    };

    if (table === 'user-pkm') {
      await sql(`
        CREATE TYPE role_enum AS ENUM ('Manager', 'Worker');
      `);
    }

    const result = await sql(createTableQueries[table]);
    return result;

  } catch (error) {
    console.error("Error creating table:", error);
    return `An error occurred while creating the table: ${error}`;
  }
}

export async function createUser(data: userInfo) {

  if (!process.env.DATABASE_URL) {
    console.error("Database URL is missing!");
    return "Database URL is missing in the environment variables.";
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const result = await sql`
      INSERT INTO "user-pkm" (id, name, email, role, phone, image_url)
      VALUES (${data.id}, ${data.name}, ${data.email}, ${data.role}, ${data.phone} , ${data.image_url})
    `;
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    return `An error occurred while creating the user: ${error}`;
  }
}

export async function deleteUser(id: string) {

  if (!process.env.DATABASE_URL) {
    console.error("Database URL is missing!");
    return "Database URL is missing in the environment variables.";
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const result = await sql`
      DELETE FROM "user-pkm" WHERE id = ${id}
    `;
    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    return `An error occurred while deleting the user: ${error}`;
  }
}
