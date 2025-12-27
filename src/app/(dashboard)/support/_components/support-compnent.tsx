import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

const SupportComponent = () => {
  return (
    <div className="space-y-5">
      <div className="bg-white p-5 border border-gray-200 rounded-lg">
        <h6 className="text-sm">Contact Support</h6>

        <h1 className="text-2xl font-bold text-primary my-3">Get in Touch</h1>

        <p className="opacity-50">
          For general questions or support, please email us directly we
          typically response within 24 hours.
        </p>

        <div className="my-8 flex items-center gap-2 text-primary font-medium">
          <Mail />

          <button>support@healthcare.com</button>
        </div>

        <div className="mt-6">
          <Link href={`mailto:support@healthcare.com0`}>
            <Button className="h-[45px] w-[130px]">Email Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupportComponent;
