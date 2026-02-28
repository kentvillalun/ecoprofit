import { Inter } from "next/font/google";
import { Pill } from "../ui/Pill";
import { PendingActions } from "./PendingActions";
import { Card } from "../ui/Card";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const RequestTable = ({ data, status }) => {
  const tableConfig = {
    pending: [
      { header: "Date", render: (data) => data.createdAt },
      {
        header: "Household",
        render: (data) => data.residentName,
      },
      { header: "Sitio", render: (data) => data.sitio },
      {
        header: "Material",
        render: (data) => data.materialType,
      },
      {
        header: "Est. Qty",
        render: (data) => data.estimatedWeight,
      },
      {
        header: "Status",
        render: (data) => (
          <div className="flex items-center justify-center">
            <Pill type={data.status} />
          </div>
        ),
      },
      {
        header: "Action",
        render: (data) => (
          <div className="flex items-center justify-center">
            <PendingActions />
          </div>
        ),
      },
    ],
  };

  const columns = tableConfig[status];


  const filteredRequest = data.filter(req => req.status === status)

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
          {filteredRequest.map((req) => (
            <tr className="text-center hover:bg-[#f8f8f8] transition-all transform " key={req.id}>
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
