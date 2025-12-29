import { Button } from "@/components/ui/button";
import { CirclePlus, MessageCircleQuestionMark, Receipt } from "lucide-react";
import Link from "next/link";
import React from "react";

const OverviewFooter = () => {
  return (
    <div className="space-x-5">
      <Link href={"/new-session"}>
        <Button className="h-[50px] w-[180px] font-medium">
          <CirclePlus /> New Session
        </Button>
      </Link>

      <Link href={"/billing"}>
        <Button className="h-[50px] w-[180px] font-medium">
          <Receipt /> Billing
        </Button>
      </Link>

      <Link href={`/support`}>
        <Button className="h-[50px] w-[180px] font-medium">
          <MessageCircleQuestionMark /> Support
        </Button>
      </Link>
    </div>
  );
};

export default OverviewFooter;
