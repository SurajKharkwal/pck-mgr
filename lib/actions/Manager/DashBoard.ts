
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


export async function pckCard() {
  const pck = await prisma.entry.findMany({
    where: {
      date: new Date(),
    },
    select: {
      qtyIn: true,
      qtyOut: true,
    },
  });

  const sum = (arr: number[]) => arr.reduce((total, num) => total + num, 0);
  const pckIn = sum(pck.map(entry => entry.qtyIn || 0));
  const pckOut = sum(pck.map(entry => entry.qtyOut || 0));

  return { pckIn, pckOut };
}



export async function getUserEntriesToday() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const groupedEntries = await prisma.entry.groupBy({
    by: ['userId'],
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    _count: {
      _all: true, // Count entries for each user
    },
  });

  let maxUserEntries = 0;
  let totalUserEntries = 0;

  for (const group of groupedEntries) {
    maxUserEntries = Math.max(maxUserEntries, group._count._all);
    totalUserEntries += group._count._all;
  }

  return {
    maxUserEntries,
    totalUserEntries,
  };
}
