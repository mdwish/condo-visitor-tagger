import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ResidentInfo {
  name: string;
  unit: string;
  phone: string;
}

interface Props {
  onNext: (data: ResidentInfo) => void;
}

export const ResidentForm = ({ onNext }: Props) => {
  const [formData, setFormData] = useState<ResidentInfo>({
    name: "",
    unit: "",
    phone: "",
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").substring(0, 10);
    if (numbers.length === 0) return "";
    if (numbers.length < 4) return `(${numbers}`;
    if (numbers.length < 7) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Card className="w-full max-w-md p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Resident Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="unit">Unit Number</Label>
          <Input
            id="unit"
            required
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
            placeholder="(XXX) XXX-XXXX"
          />
        </div>
        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Card>
  );
};