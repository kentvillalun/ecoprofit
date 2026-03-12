export const PendingActions = () => {
  return (
    <div className="flex items-center gap-3 text-sm">
      <button className="text-gray-600 hover:underline">View</button>
      <button className="text-green-600 hover:underline">Approve</button>
      <button className="text-red-500 hover:underline">Decline</button>
    </div>
  );
};