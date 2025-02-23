import { EventHandler } from "react"
import { Client } from "../types"
import { useDeleteClientMutation, useQueryClient } from "../hooks/api/clientsApi"
import useToastContext from "../hooks/context hooks/useToastContext"
import useModalFormContext from "../hooks/context hooks/useModalFormContext"

interface Props {
    client: Client
}

const TableListItem: React.FC<Props> = ({ client }) => {
    const { mutateAsync: deleteClient, isPending: deleteIspending } = useDeleteClientMutation()
    const queryClient = useQueryClient()
    const {openToast} = useToastContext()
    const {modalFormDispatch} = useModalFormContext()

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