import { Inter } from "next/font/google"
import { Pill } from "../ui/Pill"

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
})



export const RequestTable = ({mockRequests, status}) => {

    const tableConfig = {
        pending: [
            { header: "Date", render: (mockRequests) => mockRequests.createdAt },
            { header: "Household", render: (mockRequests) => mockRequests.residentName },
            { header: "Sitio", render: (mockRequests) => mockRequests.sitio },
            { header: "Material", render: (mockRequests) => mockRequests.materialType },
            { header: "Est. Qty", render: (mockRequests) => mockRequests.estimatedWeight },
            { header: "Status", render: (mockRequests) => <Pill type={mockRequests.status}/> },
            { header: "Action", render: (mockRequests) => <Pill type={mockRequests.status}/> },
            
        ]
    }

    return (
        <div className={`${inter.className} hidden md:flex`}>
            <div>

            </div>
        </div>

    )
}