import { createContext, Dispatch, ReactNode, useReducer } from "react";
import modalFormReducer, { ModalFormReducerActions } from "../reducers/modalFormReducer";
import { Client } from "../types";

export interface ModalFormState {
    isOpen: boolean
    mode: "add" | "edit"
    data: Client | null
}

export const modalFormInitialState: ModalFormState = {
    isOpen: false,
    mode: "add",
    data: null
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