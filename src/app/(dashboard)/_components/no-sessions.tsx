import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NoSessions = () => {
  return (
    <div className="max-w-lg p-5 mx-auto mt-24 shadow-[1px_2px_10px_0px_#00000029] rounded-lg text-center">
      <Image
        src={"/no-session.png"}
        alt="img.png"
        width={1000}
        height={1000}
        className="h-52 w-52 object-contain mx-auto"
      />

      <div>
        <h1 className="text-primary font-bold text-2xl mt-10">
          No reports yet
        </h1>

        <p className="mt-4 mb-6 opacity-50">
          Your dashboard is looking a little empty. Begin by creating a new
          MDS-AI session to track and manage your documentation.
        </p>

        <Link href={`/new-session`}>
          <Button className="h-[50px]">
            <SquarePlus /> Start New Session
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoSessions;
