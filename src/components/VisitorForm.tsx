import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface VisitorInfo {
  name: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  startDate: string;
  endDate: string;
}

interface Props {
  onBack: () => void;
  onNext: (data: VisitorInfo) => void;
}

export const VisitorForm = ({ onBack, onNext }: Props) => {
  const [formData, setFormData] = useState<VisitorInfo>({
    name: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    licensePlate: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <Card className="w-full max-w-md p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Visitor Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="visitorName">Visitor's Name</Label>
          <Input
            id="visitorName"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="visitorPhone">Visitor's Phone</Label>
          <Input
            id="visitorPhone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleMake">Vehicle Make</Label>
            <Input
              id="vehicleMake"
              required
              value={formData.vehicleMake}
              onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vehicleModel">Vehicle Model</Label>
            <Input
              id="vehicleModel"
              required
              value={formData.vehicleModel}
              onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input
            id="licensePlate"
            required
            value={formData.licensePlate}
            onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <Button type="button" variant="outline" className="w-full" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="w-full">
            Generate Permit
          </Button>
        </div>
      </form>
    </Card>
  );
};