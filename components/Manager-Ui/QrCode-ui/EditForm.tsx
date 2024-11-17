"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import QRCode from "./Qrcode"
import { useState } from "react"
import { getQrCode, updateQrCode } from "@/lib/actions/Manager/Qrcode"

export default function EditForm() {
  const [userQrCode, setUserQrCode] = useState("");
  const [dbQrCode, setDbQrCode] = useState("");
  const [data, setData] = useState({ name: "", pckSize: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage("");
  };

  const saveChanges = async () => {
    setLoading(true);
    setErrorMessage("");

    if (data.name.trim() === "") {
      setErrorMessage("Name is required.");
      setLoading(false);
      return;
    }
    if (data.pckSize <= 0) {
      setErrorMessage("Package size must be greater than 0.");
      setLoading(false);
      return;
    }

    try {
      await updateQrCode(data, dbQrCode);
      setErrorMessage("");
      alert("QR code updated successfully!");
      setDbQrCode(""); // Reset QR code after success
      setData({ name: "", pckSize: 0 }); // Reset the form data
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQrCode = async () => {
    setLoading(true);
    setErrorMessage("");
    if (!userQrCode.trim()) {
      setErrorMessage("Please enter a QR code.");
      setLoading(false);
      return;
    }

    try {
      const qrCodeData = await getQrCode(userQrCode);
      if (qrCodeData && qrCodeData.name) {
        setData({
          name: qrCodeData.name,
          pckSize: qrCodeData.pckSize
        });
        setDbQrCode(userQrCode);
      } else {
        setErrorMessage("QR code not found.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching QR code details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-md:flex-col w-full justify-around">
      <Card className="max-w-[480px] max-md:my-8 w-full h-[480px] flex justify-around flex-col">
        <CardHeader>
          <CardTitle>Edit Qr-Code</CardTitle>
          <CardDescription>
            Change your QR code details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="userQrCode">QR code</Label>
            <Input
              id="userQrCode"
              type="text"
              placeholder="Enter the QR code"
              onChange={e => setUserQrCode(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              disabled={dbQrCode === ""}
              placeholder="Enter new Name"
              value={data.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pckSize">Package Size</Label>
            <Input
              id="pckSize"
              disabled={dbQrCode === ""}
              type="number"
              placeholder="Enter new package size"
              value={data.pckSize}
              onChange={(e) =>
                handleInputChange("pckSize", parseInt(e.target.value) || 0)
              }
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 font-extralight">{errorMessage}</p>
          )}
        </CardContent>
        <CardFooter className="gap-x-4">
          <Button
            onClick={saveChanges}
            disabled={dbQrCode === "" || loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </Button>
          <Button
            variant={"ghost"}
            onClick={fetchQrCode}
            disabled={loading || !userQrCode}
          >
            {loading ? "Fetching..." : "Get QR Code"}
          </Button>
        </CardFooter>
      </Card>
      <QRCode qrString={dbQrCode} />
    </div>
  );
}
