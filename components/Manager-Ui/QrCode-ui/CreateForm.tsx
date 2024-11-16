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

export default function CreateForm() {
  const [data, setData] = useState({ name: "", pckSize: 0 });

  const handleInputChange = (field: string, value: string | number) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-[480px] h-[480px] flex flex-col justify-around">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          This page is dedicated to create QR-code for the packages.
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
            placeholder="Enter the size (no of items in package)"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => console.log(data)}>Save changes</Button>
      </CardFooter>
    </Card>
  );
}

