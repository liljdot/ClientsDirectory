import { useContext } from "react"
import { toastContext } from "../../contexts/toastContext"

const useToastContext = (): {openToast: (type: "success" | "warning" | "info" | "error", data: string) => void} => {
    const context = useContext(toastContext)

    if (!context) {
        throw new Error("useToastContext must be called from within ToastContextProvider")
    }

    return context
}

export default useToastContext