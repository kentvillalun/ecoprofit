"use client";


import { ResidentBottomNav } from "@/components/navigation/ResidentBottomNav";
import { usePathname } from "next/navigation";

export default function ResidentLayout({ children }) {
  const pathname = usePathname();

  const paths = ["/capture", "/announcements", "/profile/personal-information", "/profile/notifications", "/profile/settings", "/profile/help-support"]
  const hideNav = paths.some(paths =>  pathname.startsWith(paths))

  return (
    <>
      <main className="">{children}</main>

      {!hideNav && <ResidentBottomNav />}
       
    </>
  );
}
