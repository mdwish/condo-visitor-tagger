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
      <Card className="p-8 mb-6 mx-auto max-w-[600px] print:w-1/2 print:mx-auto print:shadow-none" id="permit">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-1">Sussex House</h1>
          <h2 className="text-xl mb-2">Temporary Visitor Parking Permit</h2>
          <p className="text-sm mb-1">Permit #{permitId}</p>
          <p className="text-sm text-gray-600">
            Authorized on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Unit:</p>
                <p>{resident.unit}</p>
              </div>
              <div>
                <p className="font-semibold">Start:</p>
                <p>{new Date(visitor.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">End:</p>
                <p>{new Date(visitor.endDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div>
              <p className="font-semibold mb-1">Vehicle Description:</p>
              <p>{visitor.vehicleMake} {visitor.vehicleModel}</p>
              <p className="mt-1">License: {visitor.licensePlate}</p>
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

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Must be displayed visibly on the vehicle's dashboard.</p>
          <p>Guests may park in any available parking spot.</p>
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