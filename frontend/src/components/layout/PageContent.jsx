import { twMerge } from "tailwind-merge";

export const PageContent = ({
  children,
  className = "",
  top = "top-18",
  withBottomNav = true,
  padding = "px-3 py-6",
}) => {
  return (
    <div
      className={`
        absolute left-0 right-0 ${top} 
        h-[calc(100dvh-72px)]
        ${twMerge("flex flex-col gap-6", className)}
        overflow-y-auto
        ${padding}  ${withBottomNav ? "pb-[calc(12rem+env(safe-area-inset-bottom))]" : "pb-[calc(13rem+env(safe-area-inset-bottom))]"}
        
        
      `}
    >
      {children}
    </div>
  );
};
