export const PageContent = ({ children, className = "", top = "top-18", withBottomNav = true }) => {
  return (
    <div
      className={`
        absolute left-0 right-0 ${top} 
        h-[calc(100dvh-72px)]
        overflow-y-auto
        p-3 flex flex-col gap-6 ${withBottomNav ? "pb-[calc(12rem+env(safe-area-inset-bottom))]" : "pb-[calc(13rem+env(safe-area-inset-bottom))]"}
        
        ${className}
      `}
    >
      {children}
    </div>
  );
};