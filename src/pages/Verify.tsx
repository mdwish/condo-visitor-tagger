import { useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const permitId = searchParams.get("id");
  const permitData = searchParams.get("data");

  if (!permitId || !permitData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md mx-auto p-6">
          <div className="flex flex-col items-center">
            <XCircle className="w-16 h-16 text-red-600 mb-4" />
            <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Permit</h1>
            <p className="text-gray-600">This parking permit is invalid or has been tampered with.</p>
          </div>
        </Card>
      </div>
    );
  }

  const permit = JSON.parse(decodeURIComponent(permitData));
  const currentDate = new Date();
  const validFrom = new Date(permit.validFrom);
  const validTo = new Date(permit.validTo);
  const isValid = currentDate >= validFrom && currentDate <= validTo;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Parking Permit Verification</h1>
        
        <div className="flex flex-col items-center mb-6">
          {isValid ? (
            <>
              <CheckCircle2 className="w-16 h-16 text-green-600 mb-2" />
              <p className="text-xl font-semibold text-green-600">VALID PERMIT</p>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-600 mb-2" />
              <p className="text-xl font-semibold text-red-600">EXPIRED PERMIT</p>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Permit Details</h3>
            <p>Permit ID: {permit.permitId}</p>
            <p>Resident: {permit.resident}</p>
            <p>Unit: {permit.unit}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Vehicle Information</h3>
            <p>Visitor: {permit.visitor}</p>
            <p>Vehicle: {permit.vehicle}</p>
            <p>License Plate: {permit.plate}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Validity Period</h3>
            <p>From: {permit.validFrom}</p>
            <p>To: {permit.validTo}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Verify;