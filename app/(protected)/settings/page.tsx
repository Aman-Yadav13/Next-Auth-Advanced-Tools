"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { signOut } from "next-auth/react";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    //   signOut(); --> method-1
    logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button onClick={onClick} type="submit">
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
