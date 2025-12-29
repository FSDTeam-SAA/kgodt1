/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FlagSeverityCardProps {
  highRisk: any[];
  mediumRisk: any[];
  lowRisk: any[];
  totalFlags: number;
}

const FlagSeverityCard = ({ 
  highRisk, 
  mediumRisk, 
  lowRisk, 
  totalFlags 
}: FlagSeverityCardProps) => {
  const highRiskPercentage = totalFlags > 0 ? (highRisk.length / totalFlags) * 100 : 0;
  const mediumRiskPercentage = totalFlags > 0 ? (mediumRisk.length / totalFlags) * 100 : 0;
  const lowRiskPercentage = totalFlags > 0 ? (lowRisk.length / totalFlags) * 100 : 0;

  return (
    <Card className="border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#FEF2F2] rounded-md text-[#EF4444]">
            <Flag className="w-4 h-4" />
          </div>
          <CardTitle className="text-base font-semibold text-[#334155]">
            Flag Severity Breakdown
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* High Risk */}
        <SeverityBar
          label="High Risk"
          count={highRisk.length}
          percentage={highRiskPercentage}
          color="bg-[#EF4444]"
          textColor="text-[#EF4444]"
          severityText="Critical"
        />

        {/* Medium Risk */}
        <SeverityBar
          label="Medium Risk"
          count={mediumRisk.length}
          percentage={mediumRiskPercentage}
          color="bg-[#F59E0B]"
          textColor="text-[#F59E0B]"
          severityText="Moderate"
        />

        {/* Low Risk */}
        <SeverityBar
          label="Low Risk"
          count={lowRisk.length}
          percentage={lowRiskPercentage}
          color="bg-[#22C55E]"
          textColor="text-[#22C55E]"
          severityText="Minor"
        />

        {/* Footer Stats */}
        <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748B]">Total Flags</span>
            <span className="text-lg font-bold text-[#1E293B]">
              {totalFlags}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#64748B]">
              Requires documentation review
            </span>
            <span className="text-lg font-bold text-[#EF4444]">
              {highRisk.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SeverityBar = ({ 
  label, 
  count, 
  percentage, 
  color, 
  textColor,
  severityText 
}: {
  label: string;
  count: number;
  percentage: number;
  color: string;
  textColor: string;
  severityText: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-xs">
      <span className="font-semibold text-[#334155]">{label}</span>
      <span className={`font-bold ${textColor} text-sm`}>
        {count} Flags
      </span>
    </div>
    <div className="relative h-6 w-full bg-[#F1F5F9] rounded overflow-hidden">
      <div 
        className={`absolute inset-y-0 left-0 ${color} flex items-center justify-end pr-2 transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      >
        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
          {severityText}
        </span>
      </div>
    </div>
  </div>
);

export default FlagSeverityCard;