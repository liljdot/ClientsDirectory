import { Reducer } from "react";
import { ModalFormState } from "../contexts/modalFormCOntext";

export type ModalFormReducerActions = { type: "OPEN_MODAL", payload: "add" | "edit" } |
{ type: "CLOSE_MODAL", payload: null }

const modalFormReducer: Reducer<ModalFormState, ModalFormReducerActions> = (state, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { isOpen: true, mode: action.payload }
        case "CLOSE_MODAL":
            return {...state, isOpen: false}
    }
}

export default modalFormReducer