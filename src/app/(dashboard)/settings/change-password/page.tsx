import React from "react";
import SettingSidebar from "../_components/settings-sidebar";
import ChangePasswordForm from "./_components/change-password-form";
import AppTopBar from "@/components/shared/app-topbar";

const ChangePasswordPage = () => {
  return (
    <div>
      <AppTopBar title="Settings" desc="Ready to compete in your profile?" />
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 p-5">
        <div className="md:col-span-2 ">
          <SettingSidebar />
        </div>
        <div className="md:col-span-5 ">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
