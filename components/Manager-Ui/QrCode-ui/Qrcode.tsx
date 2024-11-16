export default function QRCode({ qrString }: { qrString: string }) {

  return (
    <div className=" max-w-[480px] w-full h-[480px] border-2 border-dotted rounded-xl shadow-md">
      {
        qrString ? <div></div> : <div className="flex w-full h-full items-center justify-center font-extralight text-neutral-600">Please Fill the form to generate the qrcode</div>
      }
    </div>
  )
}
