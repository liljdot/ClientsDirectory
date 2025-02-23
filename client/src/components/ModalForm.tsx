import { ChangeEvent, EventHandler, FormEventHandler, useState } from "react"
import useModalFormContext from "../hooks/context hooks/useModalFormContext"

interface Props {

}

const ModalForm: React.FC<Props> = () => {
    const { modalFormState, modalFormDispatch } = useModalFormContext()
    const [form, setForm] = useState({ ...modalFormState.data })

    const handleFormChange: EventHandler<ChangeEvent<HTMLInputElement>> = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFormSelectChange: EventHandler<ChangeEvent<HTMLSelectElement>> = e => {
        setForm(prev => ({ ...prev, isActive: e.target.value == "active" }))
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        console.log(form)
        modalFormDispatch({ type: "CLOSE_MODAL", payload: null })

    }

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal" open={true}>
                <div className="modal-box bg-primary rounded">
                    <h3 className="font-bold text-lg py-4">{modalFormState.mode == "add" ? "Add Client" : "Update Client"}</h3>

                    <form method="dialog" onSubmit={handleSubmit}>
                        {/* if there is a button in form, it will close the modal */}
                        <label className="input input-borderd w-full my-4 flex items-center gap-2 rounded ">
                            <input name="name" type="text" className="grow" placeholder="Name" value={form.name} onChange={handleFormChange} />
                        </label>

                        <label className="input input-borderd w-full my-4 flex items-center gap-2 rounded">
                            <input name="email" type="text" className="grow" placeholder="Email" value={form.email} onChange={handleFormChange} />
                        </label>

                        <label className="input input-borderd w-full my-4 flex items-center gap-2 rounded">
                            <input name="job" type="text" className="grow" placeholder="Job" value={form.job} onChange={handleFormChange} />
                        </label>

                        <div className="flex mb-4 justify-between">
                            <label className="input input-borderd w-full flex items-center gap-2 rounded">
                                <input name="rate" type="number" className="grow" placeholder="Rate" value={form.rate} onChange={handleFormChange} />
                            </label>

                            <select name="isActive" defaultValue={modalFormState.data?.isActive ? "active" : "inactive"} className="select select-bordered max-w-xs rounded" onChange={handleFormSelectChange}>
                                <option value={"inactive"}>Inactive</option>
                                <option value={"active"}>Active</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { modalFormDispatch({ type: "CLOSE_MODAL", payload: null }) }}>✕</button>
                        {modalFormState.mode == "add" ? <button className="btn btn-info rounded">Add</button>
                            : <button type="submit" className="btn btn-warning rounded">Save Changes</button>}
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default ModalForm