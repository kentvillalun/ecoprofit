export const SkeletonCard = ({rowsCount, className = ""}) => {
  return (
    <div className={`md:pl-77 flex flex-col md:hidden ${className}`}>
      {Array.from({ length: rowsCount }).map((_, i) => (
        <div className="rounded-md p-4 max-w-sm w-full" key={i}>
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-400 rounded"></div>
              <div className="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
      ))}   
    </div>
  );
};
