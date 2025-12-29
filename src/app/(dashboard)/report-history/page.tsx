import AppTopBar from "@/components/shared/app-topbar";
import React from "react";
import SearchFilter from "./_components/search-filter";
import SessionTable from "../_components/session-table";

const page = () => {
  return (
    <div className="space-y-8">
      <div>
        <AppTopBar
          title="Report History"
          desc="View and manage processed MDS documentation reports."
        />
      </div>

      <div>
        <SearchFilter />
      </div>

      <div>
        <SessionTable />
      </div>
    </div>
  );
};

export default page;
