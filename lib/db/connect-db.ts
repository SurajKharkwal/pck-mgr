
import { Pool } from 'pg';

if (!process.env.DATABASE_URL)
  throw new Error("No DataBase Url")
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

