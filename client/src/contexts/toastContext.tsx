import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import Toast from "../components/Toast";

interface Props {
    children: ReactNode
}


export const toastContext = createContext<{ openToast: (type: "success" | "warning" | "info" | "error", data: string) => void } | undefined>(undefined)

const openToast = (type: "success" | "warning" | "info" | "error", data: string) => {
    toast(<Toast type={type} />, { data, autoClose: 3000, customProgressBar: true, closeButton: false, className: "flex flex-row justify-end" })
}

export const ToastContextProvider: React.FC<Props> = ({children}) => {

    return (
        <toastContext.Provider value={{ openToast }}>
            {children}
        </toastContext.Provider>
    )
}