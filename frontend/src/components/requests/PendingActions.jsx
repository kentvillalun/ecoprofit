import Link from "next/link";

export const PendingActions = () => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <Link href={""} className="text-gray-600">
        View
      </Link>
      <button className="text-green-600">Approve</button>
      <button className="text-red-600">Decline</button>
    </div>
  );
};
