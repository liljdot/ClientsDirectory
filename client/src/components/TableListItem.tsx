import { Client } from "../types"
import useModalFormContext from "../hooks/context hooks/useModalFormContext"

interface Props {
    client: Client
    deleteItem: (id: string) => void
    deleteIspending: boolean
    variable: string | undefined
}

const TableListItem: React.FC<Props> = ({ client, deleteItem, deleteIspending, variable }) => {
    const { modalFormDispatch } = useModalFormContext()

    return (
        <>
            <tr>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td><button className={`btn rounded-full w-20 ${client.isActive ? "btn-success" : "btn-outline btn-primary"}`}>{client.isActive ? "Active" : "Inactive"}</button></td>
                <td><button className="btn-warning btn rounded" onClick={() => { modalFormDispatch({ type: "OPEN_MODAL", payload: { mode: "edit", data: client } }) }}>Update</button></td>
                <td><button className="btn-error btn rounded" onClick={() => deleteItem(client.id)}>{deleteIspending && variable == client.id ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}</button></td>
            </tr>
        </>
    )
}

export default TableListItem