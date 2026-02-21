"use client";

import { Sidebar } from "@/components/navigation/Sidebar";
import { useState, createContext } from "react";

export const DrawerContext = createContext();

export default function BarangayLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DrawerContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
        <main className="">{children}</main>
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Sidebar />
            </div>
          </>
        )}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>
      </DrawerContext.Provider>
    </>
  );
}
