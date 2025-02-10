import { Client } from "../types"

const TableList: React.FC = () => {
    const clients: Client[] = [
        { name: "John Doe", email: "john.doe@gmail.com", job: "Developer", isActive: true, rate: "100", id: "1" },
        { name: "Jane Doe", email: "jane.doe@gmail.com", job: "Developer", isActive: true, rate: "101", id: "2" },
        { name: "Naomi Jack", email: "naomi.jack@gmail.com", job: "Developer", isActive: false, rate: "102", id: "3" }
    ]

    return (
        <div className="overflow-x-auto mt-10">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Job</th>
                        <td>Rate</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody className="hover:bg-base-300">
                    {clients.map(client => (
                        <tr key={client.id}>
                            <th>{client.id}</th>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.job}</td>
                            <td>{client.rate}</td>
                            <td><button className={`btn rounded-full w-20 ${client.isActive ? "btn-success" : "btn-outline btn-primary"}`}>{client.isActive ? "Active" : "Inactive"}</button></td>
                            <td><button className="btn-warning btn rounded-full">Update</button></td>
                            <td><button className="btn-error btn rounded-full">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableList