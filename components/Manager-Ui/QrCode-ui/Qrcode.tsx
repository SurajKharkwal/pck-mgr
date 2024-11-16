import { useEffect, useRef } from "react";
import QRCodeLib from "qrcode";
import { Button } from "@/components/ui/button";

export default function QRCode({ qrString }: { qrString: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrString && canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, qrString, { width: 240 }, (error) => {
        if (error) console.error("Error generating QR code:", error);
      });
    }
  }, [qrString]);

  const handleDownload = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.href = canvasRef.current.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    }
  };

  return (
    <div className="max-w-[480px] w-full h-[480px] border-2 border-dotted rounded-xl shadow-md flex flex-col items-center justify-center p-4 space-y-4">
      {qrString ? (
        <>
          <canvas ref={canvasRef} className="w-full max-w-[240px] h-auto"></canvas>
          <Button onClick={handleDownload}>Download QR Code</Button>
        </>
      ) : (
        <div className="flex w-full h-full items-center justify-center font-extralight text-neutral-600">
          Please fill out the form to generate the QR code.
        </div>
      )}
    </div>
  );
}
