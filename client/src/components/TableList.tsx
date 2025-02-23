import useModalFormContext from "../hooks/useModalFormContext"
import { Client } from "../types"
import { toast, ToastContainer } from "react-toastify"
import Toast from "./Toast"
import { useGetClientsQuery } from "../hooks/api/clientsApi"
import TableListItem from "./TableListItem"

const TableList: React.FC = () => {
    let clients: Client[] = []
    const { data, isLoading, refetch, isError, isRefetching } = useGetClientsQuery()
    const { modalFormDispatch } = useModalFormContext()

    const openToast = (type: "success" | "warning" | "info" | "error", data: string) => {
        toast(<Toast type={type} />, { data, autoClose: 3000, customProgressBar: true, closeButton: false, className: "flex flex-row justify-end" })
    }


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
            <button onClick={() => openToast("success", "Error: Unable to delete client")}>Click</button>

            < ToastContainer />

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
                                <TableListItem key={client.id} client={client} modalFormDispatch={modalFormDispatch} openToast={openToast} />
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