import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResidentInfo } from "./ResidentForm";
import { VisitorInfo } from "./VisitorForm";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  resident: ResidentInfo;
  visitor: VisitorInfo;
  permitId: string;
  onNewPermit: () => void;
}

export const ParkingPermit = ({ resident, visitor, permitId, onNewPermit }: Props) => {
  const handlePrint = () => {
    window.print();
  };

  const permitData = {
    permitId,
    resident: resident.name,
    unit: resident.unit,
    visitor: visitor.name,
    vehicle: `${visitor.vehicleMake} ${visitor.vehicleModel}`,
    plate: visitor.licensePlate,
    validFrom: visitor.startDate,
    validTo: visitor.endDate,
  };

  const verificationUrl = `${window.location.origin}/verify?id=${permitId}&data=${encodeURIComponent(JSON.stringify(permitData))}`;

  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <Card className="p-8 mb-6 print:shadow-none print:w-1/2 print:mx-auto" id="permit">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Visitor Parking Permit</h1>
          <p className="text-sm text-gray-500">Permit ID: {permitId}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 order-2 md:order-1">
            <div>
              <h3 className="font-semibold mb-1">Resident Information</h3>
              <p>Name: {resident.name}</p>
              <p>Unit: {resident.unit}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Visitor Information</h3>
              <p>Name: {visitor.name}</p>
              <p>Vehicle: {visitor.vehicleMake} {visitor.vehicleModel}</p>
              <p>License Plate: {visitor.licensePlate}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1">Validity Period</h3>
              <p>From: {visitor.startDate}</p>
              <p>To: {visitor.endDate}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center order-1 md:order-2">
            <QRCodeSVG
              value={verificationUrl}
              size={200}
              level="H"
              className="w-full max-w-[200px] mb-4"
            />
            <p className="text-sm text-gray-500">Scan to verify permit</p>
          </div>
        </div>
      </Card>
      
      <div className="flex space-x-4 print:hidden">
        <Button onClick={handlePrint} className="w-full">
          Print Permit
        </Button>
        <Button onClick={onNewPermit} variant="outline" className="w-full">
          Create New Permit
        </Button>
      </div>
    </div>
  );
};