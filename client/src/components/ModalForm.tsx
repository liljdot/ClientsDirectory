import { ChangeEvent, EventHandler, useState } from "react"
import useModalFormContext from "../hooks/useModalFormContext"

interface Props {

}

const ModalForm: React.FC<Props> = () => {
    const { modalFormState, modalFormDispatch } = useModalFormContext()
    const [form, setForm] = useState({ ...modalFormState.data })

    const handleFormChange: EventHandler<ChangeEvent<HTMLInputElement>> = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_3" className="modal" open={true}>
                    <div className="modal-box bg-primary rounded">
                        <h3 className="font-bold text-lg py-4">{modalFormState.mode == "add" ? "Add Client" : "Update Client"}</h3>

                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <label className="input rounded">
                                <input name="name" type="text" className="grow" placeholder="Name" value={form.name} onChange={handleFormChange} />
                            </label>

                            <label className="input rounded">
                                <input name="email" type="text" className="grow" placeholder="Email" value={form.email} onChange={handleFormChange} />
                            </label>

                            <label className="input rounded">
                                <input name="job" type="text" className="grow" placeholder="Job" value={form.job} onChange={handleFormChange} />
                            </label>

                            <div className="flex mb-4 justify-between">
                                <label className="input">
                                    <input name="rate" type="number" className="grow" placeholder="Rate" value={form.rate} onChange={handleFormChange} />
                                </label>
                            </div>

                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { modalFormDispatch({ type: "CLOSE_MODAL", payload: null }) }}>✕</button>
                            <button className={`btn btn-${modalFormState.mode == "add" ? "info" : "warning"} rounded`}>{modalFormState.mode == "add" ? "Add" : "Save Changes"}</button>
                        </form>
                        {modalFormState.data?.name}
                    </div>
                </dialog>
        </>
    )
}

export default ModalForm