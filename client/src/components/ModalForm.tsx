import useModalFormContext from "../hooks/useModalFormContext"

interface Props {
    
}

const ModalForm: React.FC<Props> = () => {
    const {modalFormState, modalFormDispatch} = useModalFormContext()
    return (
        <>
            {modalFormState.isOpen && <>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_3" className="modal" open={true}>
                    <div className="modal-box bg-primary rounded">
                        <h3 className="font-bold text-lg py-4">{modalFormState.mode == "add" ? "Add Client" : "Update Client"}</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => { modalFormDispatch({type: "CLOSE_MODAL", payload: null}) }}>✕</button>
                            <button className={`btn btn-${modalFormState.mode == "add" ? "info" : "warning"} rounded`}>{modalFormState.mode == "add" ? "Add" : "Save Changes"}</button>
                        </form>
                    </div>
                </dialog>
            </>}
        </>
    )
}

export default ModalForm