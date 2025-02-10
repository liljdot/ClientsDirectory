import { createContext, Dispatch, ReactNode, useReducer } from "react";
import modalFormReducer, { ModalFormReducerActions } from "../reducers/modalFormReducer";

export interface ModalFormState {
    isOpen: boolean
    mode: "add" | "edit"
}

export const modalFormInitialState: ModalFormState = {
    isOpen: false,
    mode: "add"
}

export const modalFormContext = createContext<{modalFormState: ModalFormState, modalFormDispatch: Dispatch<ModalFormReducerActions>} | undefined>(undefined)

const ModalFormContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(modalFormReducer, modalFormInitialState)
    
    return (
        <modalFormContext.Provider value={{modalFormState: state, modalFormDispatch: dispatch}}>
            {children}
        </modalFormContext.Provider>
    )
}

export default ModalFormContextProvider