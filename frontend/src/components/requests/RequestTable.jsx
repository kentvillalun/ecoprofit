import { Inter } from "next/font/google";
import { Pill } from "../ui/Pill";
import { PendingActions } from "./PendingActions";
import { Card } from "../ui/Card";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const RequestTable = ({ mockRequests, status }) => {
  const tableConfig = {
    pending: [
      { header: "Date", render: (mockRequests) => mockRequests.createdAt },
      {
        header: "Household",
        render: (mockRequests) => mockRequests.residentName,
      },
      { header: "Sitio", render: (mockRequests) => mockRequests.sitio },
      {
        header: "Material",
        render: (mockRequests) => mockRequests.materialType,
      },
      {
        header: "Est. Qty",
        render: (mockRequests) => mockRequests.estimatedWeight,
      },
      {
        header: "Status",
        render: (mockRequests) => (
          <div className="flex items-center justify-center">
            <Pill type={mockRequests.status} />
          </div>
        ),
      },
      {
        header: "Action",
        render: (mockRequests) => (
          <div className="flex items-center justify-center">
            <PendingActions />
          </div>
        ),
      },
    ],
  };

  const columns = tableConfig[status];

  return (
    <Card className={`${inter.className} hidden md:flex px-8  overflow-x-auto`}>
      <table className="w-full text-sm border-collapse text-nowrap">
        <thead className="border-b border-[#E6EFF5]">
          <tr className="">
            {columns.map((col) => (
              <th className="font-medium text-base p-4" key={col.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {mockRequests.map((req) => (
            <tr className="  text-center" key={req.id}>
              {columns.map((col) => (
                <td key={col.header} className="p-3">
                  {col.render(req)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
