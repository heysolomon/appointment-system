import { Appointments, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Appointments[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        // ...
    ]
}

export default async function UpcomingAppoinments() {
    const data: Appointments[] = [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
    ]

    return (
        <div className=" py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
