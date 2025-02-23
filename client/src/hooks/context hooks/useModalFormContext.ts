import { Dispatch, useContext } from "react"
import { modalFormContext, ModalFormState } from "../../contexts/modalFormContext"
import { ModalFormReducerActions } from "../../reducers/modalFormReducer"


const useModalFormContext = (): {modalFormState: ModalFormState, modalFormDispatch: Dispatch<ModalFormReducerActions>} => {
    const context = useContext(modalFormContext)
    if (!context) {
        throw new Error("useModalFormContext must be called inside ModalFormProvider")
    }

    return context
}

export default useModalFormContext