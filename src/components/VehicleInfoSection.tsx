import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VEHICLE_MAKES, VEHICLE_MODELS } from "@/lib/vehicleData";

interface Props {
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  onChange: (field: string, value: string) => void;
}

export const VehicleInfoSection = ({ vehicleMake, vehicleModel, licensePlate, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleMake">Vehicle Make</Label>
          <Select
            value={vehicleMake}
            onValueChange={(value) => {
              onChange("vehicleMake", value);
              onChange("vehicleModel", "");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {VEHICLE_MAKES.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleModel">Vehicle Model</Label>
          <Select
            value={vehicleModel}
            onValueChange={(value) => onChange("vehicleModel", value)}
            disabled={!vehicleMake}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {vehicleMake && VEHICLE_MODELS[vehicleMake]?.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="licensePlate">License Plate</Label>
        <Input
          id="licensePlate"
          required
          value={licensePlate}
          onChange={(e) => onChange("licensePlate", e.target.value.toUpperCase())}
        />
      </div>
    </div>
  );
};