import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DrawerContext } from "@/app/(barangay)/layout.jsx";

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(DrawerContext);
  return (
    <aside className="w-64 h-screen bg-[#74C857] fixed top-0 text-white left-0 z-10 md:shadow-xl">
      <div className="p-4">
        <div className="flex flex-row justify-between items-center">
          <img
            src="/logo-labeled.svg"
            alt="EcoProfit Logo"
            className="aspect-6/2 object-cover max-w-40"
          />
          <div className="md:hidden">
            <XMarkIcon
              className="w-6 h-6  hover:cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
