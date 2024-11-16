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
import { useState } from "react"

export default function EditForm() {
  const [qrCode, setQrCode] = useState("");
  return (
    <Card className="w-[480px] h-[480px] flex justify-around flex-col">
      <CardHeader>
        <CardTitle>Edit Qr-Code</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">QR code</Label>
          <Input id="current" type="text" placeholder="Enter the qrcode" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="current">Name</Label>
          <Input id="current" type="text" placeholder="Enter new Name" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="current">Package Size</Label>
          <Input id="current" type="number" placeholder="Enter new package size" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  )
}
