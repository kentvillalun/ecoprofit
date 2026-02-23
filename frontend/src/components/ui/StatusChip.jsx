import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const StatusChip = ({ STATUS_TABS, currentTab, setCurrentTab }) => {
  return (
    <div className="gap-2 flex flex-row items-start justify-start overflow-x-auto pb-3 min-h-15 overflow-y-hidden">
      {STATUS_TABS.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <button
            className={`${inter.className}  py-2 px-4 font-medium rounded-lg ${isActive ? "bg-[#89D957] text-white" : "bg-[#89D95712] text-[#74C857]"} transition-all ease-in-out hover:cursor-pointer duration-300 text-nowrap ` }
            key={tab.key}
            onClick={() => setCurrentTab(tab.key)}
          >
            <h2 className="">{tab.label}</h2>
            <p>{tab?.count}</p>
          </button>
        );
      })}
    </div>
  );
};
