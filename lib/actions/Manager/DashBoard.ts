
"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function chartData() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  return await prisma.entry.findMany({
    where: {
      date: {
        gte: sevenDaysAgo,
      }
    },
    select: {
      date: true,
      qtyIn: true,
      qtyOut: true,
    }
  })
}
