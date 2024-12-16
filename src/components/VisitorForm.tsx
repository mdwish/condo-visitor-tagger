import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { VehicleInfoSection } from "./VehicleInfoSection";
import { DateSection } from "./DateSection";

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

  const handleChange = (field: keyof VisitorInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.phone.replace(/\D/g, "").length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    // Get today's date at start of day in local timezone
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convert form dates to Date objects, preserving local timezone
    const startDate = new Date(formData.startDate + 'T00:00:00');
    const endDate = new Date(formData.endDate + 'T00:00:00');

    // Compare dates using getTime() for accurate comparison
    if (startDate.getTime() < today.getTime()) {
      toast.error("Start date cannot be earlier than today");
      return;
    }

    if (endDate.getTime() <= startDate.getTime()) {
      toast.error("End date must be after start date");
      return;
    }

    const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDifference > 7) {
      toast.error("Permit duration cannot exceed 7 days");
      return;
    }

    onNext(formData);
  };

  return (
    <Card className="w-full max-w-md p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Visitor Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PersonalInfoSection
          name={formData.name}
          phone={formData.phone}
          onChange={handleChange}
        />
        <VehicleInfoSection
          vehicleMake={formData.vehicleMake}
          vehicleModel={formData.vehicleModel}
          licensePlate={formData.licensePlate}
          onChange={handleChange}
        />
        <DateSection
          startDate={formData.startDate}
          endDate={formData.endDate}
          onChange={handleChange}
        />
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