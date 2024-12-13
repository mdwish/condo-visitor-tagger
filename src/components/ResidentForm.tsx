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
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full">Next</Button>
      </form>
    </Card>
  );
};