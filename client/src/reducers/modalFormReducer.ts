import { Reducer } from "react";
import { ModalFormState } from "../contexts/modalFormCOntext";
import { Client } from "../types";

export type ModalFormReducerActions = { type: "OPEN_MODAL", payload: {mode: "add" | "edit", data?: Client} } |
{ type: "CLOSE_MODAL", payload: null }

const modalFormReducer: Reducer<ModalFormState, ModalFormReducerActions> = (state, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { isOpen: true, mode: action.payload.mode, data: action.payload.data }
        case "CLOSE_MODAL":
            return {...state, isOpen: false}
    }
}

export default modalFormReducer