import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SessionDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          {/* Executive Summary Card Skeleton */}
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-5 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Key Observations Card Skeleton */}
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-5 w-40" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2 flex-shrink-0" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Flag Detected Section Skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Skeleton className="h-7 w-7 rounded-md" />
              <Skeleton className="h-5 w-40" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((flag) => (
                <div key={flag} className="p-4 rounded-lg border border-[#E2E8F0]">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-9 w-9 rounded-lg mt-0.5" />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Content Area Skeleton */}
        <div className="lg:col-span-4 space-y-6">
          {/* Alignment Score Card Skeleton */}
          <Card className="border-[#E2E8F0] shadow-sm text-center">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-40 mx-auto" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Skeleton className="w-40 h-40 rounded-full mb-4" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>

          {/* Flag Severity Breakdown Card Skeleton */}
          <Card className="border-[#E2E8F0] shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-5 w-48" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* High Risk Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-6 w-full rounded" />
              </div>

              {/* Medium Risk Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-6 w-full rounded" />
              </div>

              {/* Low Risk Skeleton */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-6 w-full rounded" />
              </div>

              {/* Footer Stats Skeleton */}
              <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-8" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-6 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsSkeleton;