import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"

type Data = {
  code: string, packageIn: number, packageOut: number
}
const prisma = new PrismaClient()
export default async function createEntry(data: Data[]) {
  const { userId } = await auth()
  if (!userId)
    throw new Error("Un Authorized")
  await prisma.entry.createMany({
    data: data.map(item => ({
      userId,
      qrCode: item.code,
      packageIn: item.packageIn,
      packageOut: item.packageOut,
    }))
  })
}
