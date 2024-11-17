"use client";
import { Button } from "@/components/ui/button";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import createEntry from "@/lib/actions/Manager/Worker";

export default function Worker() {
  const [pckType, setPckType] = useState<"in" | "out">("in");
  const [qty, setQty] = useState(1)

  const saveQRcode = (result: IDetectedBarcode[]) => {
    if (result.length > 0) {
      const detectedCode = result[0].rawValue;
      const dataToStore = {
        qrCode: detectedCode,
        packageType: pckType,
        packageIn: pckType == "in" ? qty : 0,
        packageOut: pckType == "out" ? qty : 0
      };

      const storedData = localStorage.getItem("scannedPackages");
      const packages = storedData ? JSON.parse(storedData) : [];

      packages.push(dataToStore);
      localStorage.setItem("scannedPackages", JSON.stringify(packages));

      alert(`QR Code "${detectedCode}" saved as "${pckType}"`);
    }
  };

  const finishHandler = async () => {
    const storedData = localStorage.getItem("scannedPackages");
    if (storedData) {
      const packages = JSON.parse(storedData);
      try {
        await createEntry(packages)
      } catch (error) {
        console.log(error)
      }
      localStorage.removeItem("scannedPackages");
      alert("Data submitted to the database and localStorage cleared!");
    } else {
      alert("No packages to submit!");
    }
  };

  return (
    <div className="flex flex-col w-full h-[100dvh] items-center justify-center space-y-6">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Select Package Type</h2>
        <RadioGroup
          value={pckType}
          onValueChange={(value: string) => setPckType(value as "in" | "out")}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in" id="pck-in" />
            <label htmlFor="pck-in" className="text-sm">
              In
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="out" id="pck-out" />
            <label htmlFor="pck-out" className="text-sm">
              Out
            </label>
          </div>
        </RadioGroup>
        <Input
          type="number"
          placeholder="qty (defalut=1)"
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </section>

      <section className="max-w-md">
        <Scanner onScan={saveQRcode} />
      </section>

      <section className="flex space-x-4">
        <Button onClick={finishHandler}>Finish</Button>
      </section>
    </div>
  );
}

