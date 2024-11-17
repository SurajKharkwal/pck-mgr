"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import QRCode from "./Qrcode";
import { createQrCode } from "@/lib/actions/Manager/Qrcode";

export default function CreateForm() {
  const [data, setData] = useState({ name: "", pckSize: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrString, setQrString] = useState("");

  const handleInputChange = (field: string, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmission = async () => {
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
      const result = await createQrCode(data);
      if (result?.code) {
        setQrString(result.code); // Update the QR code
      } else {
        setErrorMessage("Failed to create QR code. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-md:flex-col max-md:items-center w-full justify-around">
      <Card className="max-w-[480px] w-full max-md:my-8 h-[480px] flex flex-col justify-around">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            This page is dedicated to creating QR codes for the packages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter the name for the package"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pckSize">Package Size</Label>
            <Input
              id="pckSize"
              type="number"
              onChange={(e) =>
                handleInputChange("pckSize", parseInt(e.target.value) || 0)
              }
              placeholder="Enter the size (number of items in the package)"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 font-extralight">{errorMessage}</p>
          )}

        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmission} disabled={loading}>
            {loading ? "Generating..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>
      <QRCode qrString={qrString} />
    </div>
  );
}
