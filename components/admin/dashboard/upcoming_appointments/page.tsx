import { Appointments, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Appointments[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            email: "peter@gmail.com",
            name: "Peter Ayani",
            status: "unapproved",
        },
        // ...
    ]
}

export default async function UpcomingAppoinments() {
    const data: Appointments[] = [
        {
            id: "728ed52f",
            email: "peter@gmail.com",
            name: "Peter Ayani",
            status: "unapproved",
        },
        {
            id: "728ed52f",
            email: "john@gmail.com",
            name: "John Saleh",
            status: "unapproved",
        },
    ]

    return (
        <div className=" py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
