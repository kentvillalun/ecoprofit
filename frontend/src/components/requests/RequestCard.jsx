import { Card } from "../ui/Card";
import Link from "next/link";
import { Pill } from "../ui/Pill";

// Juan Dela Cruz         [Pending]
// Sitio 3 • Plastic Bottles
// Est. Qty: 2 sacks
// March 14, 2026

// [ View Details ]
export const RequestCard = ({ data, status }) => {


  const filteredRequest = data.filter(req => req.status === status)

  return (
    <>
      {filteredRequest.map((d) => (
        <Card
          key={d.id}
          className="flex flex-row items-stretch justify-between "
        >
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">{d.residentName}</h3>
            <div className="text-[#727272] text-sm">
              <p className="">
                {d.sitio} • {d.materialType}
              </p>
              <p className="">Est. Qty: {d.estimatedWeight}</p>
              <p className="">{d.createdAt}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between min-h-full">
            <Pill type={d.status} />
            <Link href={""} className="text-sm italic ">
              View Details
            </Link>
          </div>
        </Card>
      ))}
    </>
  );
};
