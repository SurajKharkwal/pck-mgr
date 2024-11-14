import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='h-[100dvh] w-[100dvw] flex items-center justify-center'>
    <SignIn />
  </div>
}
