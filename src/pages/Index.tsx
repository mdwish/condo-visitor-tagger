import { useState } from "react";
import { ResidentForm, ResidentInfo } from "@/components/ResidentForm";
import { VisitorForm, VisitorInfo } from "@/components/VisitorForm";
import { ParkingPermit } from "@/components/ParkingPermit";

const generatePermitId = () => {
  return `PKG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const Index = () => {
  const [step, setStep] = useState(1);
  const [residentInfo, setResidentInfo] = useState<ResidentInfo | null>(null);
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [permitId, setPermitId] = useState<string>("");

  const handleResidentSubmit = (data: ResidentInfo) => {
    setResidentInfo(data);
    setStep(2);
  };

  const handleVisitorSubmit = (data: VisitorInfo) => {
    setVisitorInfo(data);
    setPermitId(generatePermitId());
    setStep(3);
  };

  const handleNewPermit = () => {
    setStep(1);
    setResidentInfo(null);
    setVisitorInfo(null);
    setPermitId("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Visitor Parking Permit System</h1>
          <p className="mt-2 text-gray-600">Generate parking permits for your visitors</p>
        </div>

        <div className="flex justify-center">
          {step === 1 && <ResidentForm onNext={handleResidentSubmit} />}
          {step === 2 && (
            <VisitorForm
              onBack={() => setStep(1)}
              onNext={handleVisitorSubmit}
            />
          )}
          {step === 3 && residentInfo && visitorInfo && (
            <ParkingPermit
              resident={residentInfo}
              visitor={visitorInfo}
              permitId={permitId}
              onNewPermit={handleNewPermit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;