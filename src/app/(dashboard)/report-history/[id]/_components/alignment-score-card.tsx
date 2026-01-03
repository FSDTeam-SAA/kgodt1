import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AlignmentScoreCardProps {
  alignmentScore: number;
  consistencyScore: number;
  complianceScore: number;
}

const AlignmentScoreCard = ({ 
  alignmentScore, 
  consistencyScore, 
  complianceScore 
}: AlignmentScoreCardProps) => {
  const showScore = alignmentScore > 0;
  
  return (
    <Card className="border-[#E2E8F0] shadow-sm text-center">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-[#94A3B8] uppercase tracking-wide">
          MDS Alignment Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#F1F5F9"
              strokeWidth="12"
              fill="transparent"
            />
            {showScore && (
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#EF4444"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * alignmentScore) / 100}
                strokeLinecap="round"
              />
            )}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showScore ? (
              <>
                <span className="text-4xl font-bold text-[#1E293B]">
                  {alignmentScore}%
                </span>
                <span className="text-xs text-[#94A3B8]">/100</span>
              </>
            ) : (
              <span className="text-lg font-medium text-[#94A3B8] px-5 text-center">
                Not Calculated
              </span>
            )}
          </div>
        </div>
        <div className="space-y-2 text-xs text-[#64748B]">
          <div className="flex justify-between">
            <span>Consistency Score:</span>
            <span className="font-medium">{consistencyScore}%</span>
          </div>
          <div className="flex justify-between">
            <span>Compliance Score:</span>
            <span className="font-medium">{complianceScore}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlignmentScoreCard;