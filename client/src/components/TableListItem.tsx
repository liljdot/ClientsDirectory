import { EventHandler } from "react"
import { ModalFormReducerActions } from "../reducers/modalFormReducer"
import { Client } from "../types"
import { useDeleteClientMutation, useQueryClient } from "../hooks/api/clientsApi"

interface Props {
    client: Client
    modalFormDispatch: React.Dispatch<ModalFormReducerActions>
    openToast: (type: "success" | "warning" | "info" | "error", data: string) => void
}

    const TableListItem: React.FC<Props> = ({ client, modalFormDispatch, openToast }) => {
    const { mutateAsync: deleteClient, isPending: deleteIspending } = useDeleteClientMutation()
    const queryClient = useQueryClient()
    
    const handleDelete: EventHandler<React.MouseEvent> = () => {
        deleteClient(client.id)
            .then(() => openToast("success", "Client deleted successfully"))
            .catch(e => openToast("error", e.message))
    }
    return (
        <>
            <tr>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td><button className={`btn rounded-full w-20 ${client.isActive ? "btn-success" : "btn-outline btn-primary"}`}>{client.isActive ? "Active" : "Inactive"}</button></td>
                <td><button className="btn-warning btn rounded-full" onClick={() => { modalFormDispatch({ type: "OPEN_MODAL", payload: { mode: "edit", data: client } }) }}>Update</button></td>
                <td><button className="btn-error btn rounded-full" onClick={handleDelete}>{deleteIspending ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}</button></td>
            </tr>
        </>
    )
}

export default TableListItem