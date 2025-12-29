/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import SessionDetailsSkeleton from "./SessionDetailsSkeleton";
import SessionHeader from "./session-header";
import ExecutiveSummaryCard from "./executive-summary-card";
import KeyObservationsCard from "./key-observations-card";
import RiskFlagsSection from "./risk-flags-section";
import AlignmentScoreCard from "./alignment-score-card";
import FlagSeverityCard from "./flag-severity-card";

const SessionDetails = () => {
  const { id } = useParams();
  const session = useSession();
  const status = session?.status;
  const token = session?.data?.user?.accessToken;

  const { data, isLoading } = useQuery({
    queryKey: ["session-data", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/session/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch sessions");
      }

      const data = await res.json();
      return data.data;
    },
    enabled: !!token && !!id,
  });

  if (isLoading || status === "loading") {
    return <SessionDetailsSkeleton />;
  }

  const sessionData = data;
  const aiData = sessionData?.aiRaw;

  // Process data
  const riskFlags = aiData?.risk_flags || [];
  const highRisk = riskFlags.filter((f: any) => f.severity === "high");
  const mediumRisk = riskFlags.filter((f: any) => f.severity === "medium");
  const lowRisk = riskFlags.filter((f: any) => f.severity === "low");

  const scores = aiData?.scores || {};
  const alignmentScore =
    sessionData?.score || scores?.documentation_quality || 0;
  const consistencyScore = scores?.consistency_score || 0;
  const complianceScore = scores?.compliance_score || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SessionHeader
        sessionId={sessionData?._id}
        createdAt={sessionData?.createdAt}
        riskLevel={sessionData?.riskLevel || aiData?.scores?.risk_level}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <ExecutiveSummaryCard summaryReview={sessionData?.summaryReview} />

          <KeyObservationsCard summary={aiData?.summary || {}} />

          <RiskFlagsSection riskFlags={riskFlags} />
        </div>

        {/* Sidebar Content Area */}
        <div className="lg:col-span-4 space-y-6">
          <AlignmentScoreCard
            alignmentScore={alignmentScore}
            consistencyScore={consistencyScore}
            complianceScore={complianceScore}
          />

          <FlagSeverityCard
            highRisk={highRisk}
            mediumRisk={mediumRisk}
            lowRisk={lowRisk}
            totalFlags={riskFlags.length}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
