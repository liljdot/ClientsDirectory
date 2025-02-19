import useModalFormContext from "../hooks/useModalFormContext"
import { Client } from "../types"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const TableList: React.FC = () => {
    let clients: Client[] = []

    const { modalFormDispatch } = useModalFormContext()
    const queryClient = useQueryClient()



    const { data, error, isLoading, refetch, isError, isRefetching } = useQuery<{ status: number, message: string, data: Client[] }, Error>({
        queryKey: ["clients"],
        queryFn: () => {
            return fetch("http://localhost:3000/api/clients")
                .then(res => res.json())
        }
    })

    const { mutate: deleteClient, isPending: deleteIspending } = useMutation({
        mutationFn: (clientId: string) => {
            return fetch(`http://localhost:3000/api/clients/${clientId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
                .then(res => res.json())
        },
        onSettled: () => {
            console.log("settled")
            queryClient.invalidateQueries({queryKey: ["clients"]})
        },
        // onMutate: (id) => {
        //     queryClient.cancelQueries({queryKey: "clients"})
        //     .then(() => queryClient.setQueryData(["clients", id], (oldData: any) => ({ ...oldData, data: [...oldData.data].filter(client => client.id != id) })))
        // }
    })


    if (isLoading || isRefetching) {
        return (
            <div className="flex justify-center items-center h-full">
                <span className="loading loading-ring loading-xl mt-20"></span>
            </div>
        )
    }

    if (isError) {
        console.log(error)
        return (
            <>
                <div className="flex flex-col items-center">
                    <h3 className="text-center mt-10 text-xl text-error">Unable to fetch clients</h3>
                    <button className="btn-warning btn rounded-full mt-5" onClick={() => refetch()}>Retry</button>
                </ div>
            </>
        )
    }

    if (data?.data) {
        clients = data.data
    }

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
                    {
                        clients.length ? (
                            clients.map(client => (
                                <tr key={client.id}>
                                    <th>{client.id}</th>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.job}</td>
                                    <td>{client.rate}</td>
                                    <td><button className={`btn rounded-full w-20 ${client.isActive ? "btn-success" : "btn-outline btn-primary"}`}>{client.isActive ? "Active" : "Inactive"}</button></td>
                                    <td><button className="btn-warning btn rounded-full" onClick={() => { modalFormDispatch({ type: "OPEN_MODAL", payload: { mode: "edit", data: client } }) }}>Update</button></td>
                                    <td><button className="btn-error btn rounded-full" onClick={() => { deleteClient(client.id) }}>{deleteIspending ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}</button></td>
                                </tr>
                            ))
                        ) : <></>
                    }
                </tbody>
            </table>
            {
                !clients.length && (
                    <div className="flex flex-col items-center mt-10">
                        <h3 className="text-center">You have no Clients</h3>
                        <button className="btn btn-info mt-5 rounded" onClick={() => { modalFormDispatch({ type: "OPEN_MODAL", payload: { mode: "add", data: { name: "", id: "", email: "", job: "", isActive: false, rate: "" } } }) }}>Add a Client</button>
                    </div>
                )
            }
        </div>
    )
}

export default TableList