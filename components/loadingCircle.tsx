
export default function Loading() {
  return (
    <span className="relative flex h-12 aspect-square rounded-full">
      <span className="animate-ping absolute inline-flex h-full w-full aspect-square rounded-full bg-white opacity-75"></span>
      <span className="relative inline-flex rounded-full h-12 aspect-square bg-white"></span>
    </span>
  )
}
