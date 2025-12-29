import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KeyObservationsCardProps {
  summary: Record<string, string>;
}

const KeyObservationsCard = ({ summary }: KeyObservationsCardProps) => {
  const summaryItems = [
    { key: "session_type", label: "Session Type" },
    { key: "presenting_concerns", label: "Presenting Concerns" },
    { key: "interventions_used", label: "Interventions Used" },
    { key: "response", label: "Response" },
    { key: "progress_toward_goals", label: "Progress Toward Goals" },
    { key: "clinical_impression", label: "Clinical Impression" },
    { key: "safety_concerns", label: "Safety Concerns" },
    { key: "follow_up", label: "Follow Up" },
  ];

  return (
    <Card className="border-[#E2E8F0] shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-[#F59E0B]">
          <div className="p-1.5 bg-[#FFFBEB] rounded-md">
            <Lightbulb className="w-4 h-4" />
          </div>
          <CardTitle className="text-base font-semibold text-[#334155]">
            Key Observations
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {summaryItems.map((item) => (
            summary[item.key] ? (
              <li key={item.key} className="flex items-start gap-3 text-sm text-[#475569]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E293B] flex-shrink-0" />
                <span>
                  <span className="font-medium text-[#334155]">{item.label}: </span>
                  {summary[item.key]}
                </span>
              </li>
            ) : null
          ))}
        </ul>
        {!Object.keys(summary).length && (
          <p className="text-[#94A3B8] text-sm italic">No observations available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyObservationsCard;