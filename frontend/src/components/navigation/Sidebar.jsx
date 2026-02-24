import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Squares2X2Icon as DashboardIcon,
  ClipboardDocumentListIcon as RequestIcon,
  UserIcon as ResidentsIcon,
  MegaphoneIcon as AnnoucementsIcon,
  ArchiveBoxIcon as InventoryIcon,
  BuildingStorefrontIcon as JunkshopSalesIcon,
  BanknotesIcon as FinanceIcon,
  DocumentChartBarIcon as ReportsIcon,
  Cog6ToothIcon as SettingsIcon,
  ArrowLeftStartOnRectangleIcon as LogoutIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { DrawerContext } from "@/app/(barangay)/layout.jsx";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(DrawerContext);

  const sidebarItems = [
    {
      icon: DashboardIcon,
      label: "Dashboard",
      href: "",
    },
    {
      icon: RequestIcon,
      label: "Requests",
      href: "",
    },
    {
      icon: ResidentsIcon,
      label: "Residents",
      href: "",
    },
    {
      icon: AnnoucementsIcon,
      label: "Announcements",
      href: "",
    },
    {
      icon: InventoryIcon,
      label: "Inventory",
      href: "",
    },
    {
      icon: JunkshopSalesIcon,
      label: "Junkshop Sales",
      href: "",
    },
    {
      icon: FinanceIcon,
      label: "Finance",
      href: "",
    },
    {
      icon: ReportsIcon,
      label: "Reports",
      href: "",
    },
    {
      icon: SettingsIcon,
      label: "Settings",
      href: "",
    },
  ];

  return (
    <aside
      className={`w-64 h-screen flex flex-col justify-between bg-[#74C857] fixed top-0 text-white left-0 z-10 md:shadow-xl ${poppins.className} overflow-auto z-100`}
    >
      <div className="p-4 flex flex-col gap-9">
        <div className="flex flex-row justify-between items-center">
          <img
            src="/logo-labeled.svg"
            alt="EcoProfit Logo"
            className="aspect-6/2 object-cover max-w-40 md:max-w-50"
          />
          <div className="md:hidden">
            <XMarkIcon
              className="w-6 h-6  hover:cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pl-2">
          {sidebarItems.map((items) => (
            <Link
              className="flex flex-row gap-3 hover:cursor-pointer p-2 rounded-lg hover:bg-primary transition-all ease-in-out"
              key={items.label}
              href={items.href}
            >
              <items.icon className="h-6 w-6 md:block hidden hover:cursor-pointer" />
              <label className="font-medium text-md hover:cursor-pointer">
                {items.label}
              </label>
            </Link>
          ))}
        </div>

        
      </div>
      <button className="pl-6 p-4 mb-15">
          <div className="flex flex-row gap-3 hover:cursor-pointer p-2 rounded-lg hover:bg-primary transition-all ease-in-out">
            <LogoutIcon className="h-6 w-6 md:block hidden hover:cursor-pointer" />
            <label className="font-medium text-md hover:cursor-pointer">
              Logout
            </label>
          </div>
        </button>
    </aside>
  );
};
