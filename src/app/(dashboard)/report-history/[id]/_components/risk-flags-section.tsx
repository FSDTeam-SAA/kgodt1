import { Flag, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RiskFlag {
  category: string;
  description: string;
  why_it_matters?: string;
  evidence?: string;
  severity: "high" | "medium" | "low";
}

interface RiskFlagsSectionProps {
  riskFlags: RiskFlag[];
}

const RiskFlagsSection = ({ riskFlags }: RiskFlagsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <div className="p-1.5 bg-[#FEF2F2] rounded-md text-[#EF4444]">
          <Flag className="w-4 h-4" />
        </div>
        <h2 className="text-base font-semibold text-[#334155]">
          Risk Flag Detected
        </h2>
      </div>

      <div className="space-y-3">
        {riskFlags.length > 0 ? (
          riskFlags.map((flag, idx) => (
            <RiskFlagCard key={idx} flag={flag} />
          ))
        ) : (
          <div className="p-6 text-center border border-dashed border-[#E2E8F0] rounded-lg">
            <AlertCircle className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
            <p className="text-[#64748B] text-sm">No risk flags detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

const RiskFlagCard = ({ flag }: { flag: RiskFlag }) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg border flex items-start gap-4 transition-all",
        flag.severity === "high"
          ? "bg-[#FEF2F2] border-[#FEE2E2]"
          : flag.severity === "medium"
          ? "bg-[#FFFBEB] border-[#FEF3C7]"
          : "bg-[#F0FDF4] border-[#DCFCE7]"
      )}
    >
      <div
        className={cn(
          "p-2 rounded-lg mt-0.5",
          flag.severity === "high"
            ? "text-[#EF4444]"
            : flag.severity === "medium"
            ? "text-[#F59E0B]"
            : "text-[#22C55E]"
        )}
      >
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <Badge
            className={cn(
              "font-medium px-2 py-0 text-[10px] uppercase tracking-wider rounded border-none",
              flag.severity === "high"
                ? "bg-[#FEE2E2] text-[#991B1B]"
                : flag.severity === "medium"
                ? "bg-[#FFEDD5] text-[#9A3412]"
                : "bg-[#DCFCE7] text-[#166534]"
            )}
          >
            {flag.severity === "high"
              ? "High Risk"
              : flag.severity === "medium"
              ? "Medium Risk"
              : "Low Risk"}
          </Badge>
          <span className="text-xs font-medium text-[#64748B]">
            {flag.category}
          </span>
        </div>
        <p className="text-sm font-medium text-[#1E293B] leading-tight">
          {flag.description}
        </p>
        {flag.why_it_matters && (
          <p className="text-xs text-[#64748B]">
            <span className="font-medium">Why it matters:</span> {flag.why_it_matters}
          </p>
        )}
        {flag.evidence && (
          <p className="text-xs text-[#64748B]">
            <span className="font-medium">Evidence:</span> {flag.evidence}
          </p>
        )}
      </div>
    </div>
  );
};

export default RiskFlagsSection;