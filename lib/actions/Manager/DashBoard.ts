
"use server"

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function chartData() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const data = await prisma.entry.groupBy({
    by: ['date'],
    where: {
      date: {
        gte: sevenDaysAgo,
      },
    },
    _sum: {
      pckIn: true,
      pckOut: true,
    },
    orderBy: {
      date: 'asc', // Ensure results are ordered by date
    },
  });

  return data.map((entry) => ({
    date: entry.date,
    pckIn: entry._sum.pckIn || 0,
    pckOut: entry._sum.pckOut || 0,
  }));
}


export async function pckCard() {
  const pck = await prisma.entry.findMany({
    where: {
      date: new Date(),
    },
    select: {
      pckIn: true,
      pckOut: true,
    },
  });

  const sum = (arr: number[]) => arr.reduce((total, num) => total + num, 0);
  const pckIn = sum(pck.map(entry => entry.pckIn || 0));
  const pckOut = sum(pck.map(entry => entry.pckOut || 0));

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
      _all: true,
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
export async function fetchNotifications(pageCount: number) {
  return await prisma.notification.findMany({
    skip: 10 * (pageCount - 1),
    take: 10,
    select: { title: true, description: true },
  });
}

export async function userInfo() {
  const { userId } = await auth()
  return await prisma.user.findUnique({
    where: {
      id: userId || ""
    },
    select: {
      name: true,
      email: true,
      image_url: true
    }
  })
}
