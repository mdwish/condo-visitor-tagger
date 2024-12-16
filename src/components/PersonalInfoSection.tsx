import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  name: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({ name, phone, onChange }: Props) => {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").substring(0, 10);
    if (numbers.length === 0) return "";
    if (numbers.length < 4) return `(${numbers}`;
    if (numbers.length < 7) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="visitorName">Visitor's Name</Label>
        <Input
          id="visitorName"
          required
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="visitorPhone">Visitor's Phone</Label>
        <Input
          id="visitorPhone"
          required
          value={phone}
          onChange={(e) => onChange("phone", formatPhoneNumber(e.target.value))}
          placeholder="(XXX) XXX-XXXX"
        />
      </div>
    </div>
  );
};