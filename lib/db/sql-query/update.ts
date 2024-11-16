"use server"
import { query } from "../connect-db";

export async function updateQrCode({ name, pckSize }: { name: string, pckSize: number }, qrCode: string) {
  try {
    await query(
      `
      UPDATE "QR-CODE-pkm" 
      SET name=$1, "pck-size"=$2 
      WHERE code=$3
      `,
      [name, pckSize, qrCode]
    );
  } catch (error) {
    console.error("Error updating QR code:", error);
    throw new Error("An error occurred while updating the QR code.");
  }
}
