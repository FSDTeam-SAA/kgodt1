import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExecutiveSummaryCardProps {
  summaryReview: string;
}

const ExecutiveSummaryCard = ({ summaryReview }: ExecutiveSummaryCardProps) => {
  return (
    <Card className="border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-[#2563EB]">
          <div className="p-1.5 bg-[#EFF6FF] rounded-md">
            <FileText className="w-4 h-4" />
          </div>
          <CardTitle className="text-base font-semibold text-[#334155]">
            Executive Summary
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#475569] leading-relaxed text-sm">
          {summaryReview || "No summary available"}
        </p>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummaryCard;