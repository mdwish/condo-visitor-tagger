import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  startDate: string;
  endDate: string;
  onChange: (field: string, value: string) => void;
}

export const DateSection = ({ startDate, endDate, onChange }: Props) => {
  // Get today's date string in local timezone
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          required
          min={todayStr}
          value={startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          required
          min={startDate || todayStr}
          value={endDate}
          onChange={(e) => onChange("endDate", e.target.value)}
        />
      </div>
    </div>
  );
};