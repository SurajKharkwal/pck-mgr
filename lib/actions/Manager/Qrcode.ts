"use server"

import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export async function createQrCode(data: { name: string, pckSize: number }) {
  const { userId } = await auth()
  if (!userId)
    throw new Error("Un Authorized User")

  return await prisma.qrCode.create({
    data: {
      name: data.name,
      pckSize: data.pckSize,
    }
  })
}

export async function getQrCode(code: string) {
  const { userId } = await auth()
  if (!userId)
    throw new Error("Un Authorized User")
  return await prisma.qrCode.findFirst({
    where: {
      code: {
        startsWith: code
      }
    }
  })
}

export async function updateQrCode(data: { name: string, pckSize: number }, code: string) {
  const { userId } = await auth()
  if (!userId)
    throw new Error("Un Authorized User")

  return await prisma.qrCode.update({
    data, where: { code },
  })
}
