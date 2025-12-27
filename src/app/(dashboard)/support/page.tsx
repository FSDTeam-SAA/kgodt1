import AppTopBar from "@/components/shared/app-topbar";
import React from "react";
import SupportComponent from "./_components/support-compnent";

const page = () => {
  return (
    <div className="space-y-8">
      <AppTopBar
        title="Support"
        desc="Get help with MDS documentation workflows and application support."
      />

      <div>
        <SupportComponent />
      </div>
    </div>
  );
};

export default page;
