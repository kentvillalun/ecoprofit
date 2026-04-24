export const PageContent = ({ children, className = "" }) => {
  return (
    <div
      className={`
        absolute left-0 right-0 top-18 md:top-0
        h-[calc(100dvh-72px)] md:h-screen
        overflow-y-auto
        p-3 flex flex-col gap-6
        pb-[calc(12rem+env(safe-area-inset-bottom))]
        ${className}
      `}
    >
      {children}
    </div>
  );
};