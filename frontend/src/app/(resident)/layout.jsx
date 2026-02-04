"use client";


import { ResidentBottomNav } from "@/components/navigation/ResidentBottomNav";
import { usePathname } from "next/navigation";

export default function ResidentLayout({ children }) {
  const pathname = usePathname();


  const hideNav = pathname.startsWith("/capture")

  return (
    <>
      <main className="">{children}</main>

      {!hideNav && <ResidentBottomNav />}
    </>
  );
}
