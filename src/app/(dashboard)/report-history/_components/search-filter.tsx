"use client";
import { SearchInput } from "@/components/ui/search-input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilter = () => {
  return (
    <div className="flex items-center justify-between">
      <SearchInput
        className="w-[400px] h-[50px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none bg-[#eaeaea]"
        placeholder="Search by Session ID or Date..."
      />

      <div className="flex items-center gap-5">
        <Select>
          <SelectTrigger className="w-[180px] bg-[#eaeaea] focus-visible:ring-0 h-[50px]">
            <SelectValue placeholder="All Reports" />
          </SelectTrigger>
          <SelectContent className="bg-[#eaeaea]">
            <SelectGroup>
              <SelectItem value="all-reports">All Reports</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px] bg-[#eaeaea] focus-visible:ring-0 h-[50px]">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent className="bg-[#eaeaea]">
            <SelectGroup>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="3-days">Last 3 days</SelectItem>
              <SelectItem value="7-day">7 days</SelectItem>
              <SelectItem value="2-weeks">2 weeks</SelectItem>
              <SelectItem value="1-month">1 month</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
