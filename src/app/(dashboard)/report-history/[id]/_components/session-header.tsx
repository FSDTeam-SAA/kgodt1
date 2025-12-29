import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface SessionHeaderProps {
  sessionId: string;
  createdAt: string;
  riskLevel: string;
}

const SessionHeader = ({
  sessionId,
  createdAt,
  riskLevel,
}: SessionHeaderProps) => {
  const router = useRouter();

  const getRiskLevelBadge = () => {
    const level = riskLevel?.toLowerCase();

    switch (level) {
      case "high":
        return {
          className: "bg-[#FEF2F2] text-[#991B1B] border-[#FEE2E2]",
          text: "High Risk",
        };
      case "medium":
        return {
          className: "bg-[#FFFBEB] text-[#9A3412] border-[#FEF3C7]",
          text: "Medium Risk",
        };
      case "low":
        return {
          className: "bg-[#DCFCE7] text-[#166534] border-[#DCFCE7]",
          text: "Low Risk",
        };
      default:
        return {
          className: "bg-[#DCFCE7] text-[#166534] border-none",
          text: "Completed",
        };
    }
  };

  const riskBadge = getRiskLevelBadge();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold text-[#1E293B]">
            Session #{sessionId?.slice(-7)?.toUpperCase() || "N/A"}
          </h1>
          <Badge
            className={`${riskBadge.className} font-medium px-3 py-0.5 rounded-full text-xs`}
          >
            {riskBadge.text}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-[#64748B] text-sm">
          <Calendar className="w-4 h-4" />
          <span>Processed: </span>
          <span className="font-medium text-[#1E293B]">
            {createdAt
              ? new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(createdAt))
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-[#eaeaea] border-[#E2E8F0] text-[#1E293B] hover:bg-[#e2e1e1] gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button className="bg-[#1E293B] text-white hover:bg-[#0F172A] gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
      </div>
    </div>
  );
};

export default SessionHeader;
