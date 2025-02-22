import { rejectJson } from "./functions"
import useModalFormContext from "../hooks/useModalFormContext"
import { Client } from "../types"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetClientsResponseType, GetClientsResponseErrorType } from "../types/apiTypes"
import { toast, ToastContainer } from "react-toastify"
import Toast from "./Toast"

const TableList: React.FC = () => {
    let clients: Client[] = []

    const host = window.location.host
    const serverHost = host.slice(0, host.length -4) + "3000"

    const openToast = (type: "success" | "warning" | "info" | "error", data: string) => {
        toast(<Toast type={type}/>, {data, autoClose: 3000, customProgressBar: true, closeButton: false, className: "flex flex-row justify-end"})
    }

    const { modalFormDispatch } = useModalFormContext()
    const queryClient = useQueryClient()
    const { data, error, isLoading, refetch, isError, isRefetching } = useQuery<GetClientsResponseType, GetClientsResponseErrorType>({
        queryKey: ["clients"],
        queryFn: () => {
            return fetch(`http://${serverHost}/api/clients`)
                .then(res => res.ok ? res.json() : rejectJson(res))
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
        onSuccess: (data, id) => {
            queryClient.setQueryData(["clients"], (oldData: any) => ({ ...oldData, data: [...oldData.data].filter(client => client.id != id) }))
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
        return (
            <>
                <div className="flex flex-col items-center">
                    <h3 className="text-center mt-10 text-xl text-error">Unable to fetch clients</h3>
                    <button className="btn-warning btn rounded-full mt-5" onClick={() => refetch()}>Retry</button>
                </ div>
            </>
        )
    }

    if (data) {
        clients = data.data
    }

    return (
        <div className="overflow-x-auto mt-10">
            <button onClick={() => openToast("error", "Error: Unable to delete client")}>Click</button>

            < ToastContainer/>

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