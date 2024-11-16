import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, } from '@/lib/db/sql-query/create'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }
  const payload = await req.json()
  const body = JSON.stringify(payload)
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }
  enum ROLE {
    Manager = "Manager",
    Worker = "Worker",
  }

  const { id } = evt.data
  const eventType = evt.type
  if (eventType == "user.created") {
    const { id, email_addresses, image_url, phone_numbers, first_name, last_name } = evt.data;
    await createUser({ id: id, name: `${first_name} ${last_name}`, role: ROLE.Worker, email: email_addresses[0].email_address, phone: Number(phone_numbers[0].phone_number), image_url },)
  }
  if (eventType == "user.deleted") {
    await deleteUser(`${id}`)
  }
  return new Response('', { status: 200 })
}
