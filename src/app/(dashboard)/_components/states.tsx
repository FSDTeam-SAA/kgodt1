"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const States = () => {
  const session = useSession();
  const status = session?.status;
  const token = session?.data?.user?.accessToken;

  const { data = {}, isLoading } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data?.data;
    },
    enabled: !!token,
  });

  const LoadingStates = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white p-6 shadow-[1px_2px_10px_0px_#00000029] rounded-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
          <div className="mt-4">
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading || status == "loading") {
    return <LoadingStates />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="bg-white p-5 shadow-[1px_2px_10px_0px_#00000029] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">Sessions Processed Today</h1>
          <Image
            src={`/states-1.png`}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-12 w-12 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mt-5">
            {data?.sessionsProcessedToday || "0"}
          </h1>
        </div>
      </div>

      <div className="bg-white p-5 shadow-[1px_2px_10px_0px_#00000029] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">Average Alignment Score</h1>
          <Image
            src={`/states-2.png`}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-12 w-12 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mt-5">
            {data?.averageAlignmentScore || "0"}%
          </h1>
        </div>
      </div>

      <div className="bg-white p-5 shadow-[1px_2px_10px_0px_#00000029] rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="opacity-50">High-Risk Flags Identified</h1>
          <Image
            src={`/states-3.png`}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-12 w-12 object-cover rounded-md"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold mt-5">
            {data?.highRiskFlagsIdentified || "0"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default States;
