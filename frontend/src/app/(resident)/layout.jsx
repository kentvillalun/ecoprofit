"use client";

import { ResidentBottomNav } from "@/components/navigation/ResidentBottomNav";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function ResidentLayout({ children }) {
  const pathname = usePathname();

  const paths = [
    "/capture",
    "/announcements",
    "/profile/personal-information",
    "/profile/notifications",
    "/profile/settings",
    "/profile/help-support",
    "/requests/",
  ];
  const hideNav = paths.some((paths) => pathname.startsWith(paths));

  return (
    <>
      <Toaster position="top-center" />
      <main className="">{children}</main>

      {!hideNav && <ResidentBottomNav />}
    </>
  );
}
