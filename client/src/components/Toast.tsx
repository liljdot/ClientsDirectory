import { useEffect, useState } from "react"
import { ToastContentProps } from "react-toastify"


type Props = Partial<ToastContentProps<string>> & {
    type: "success" | "warning" | "info" | "error"
}

const Toast: React.FC<Props> = ({ type, data, closeToast, toastProps }) => {
    const duration = toastProps?.autoClose
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if (!duration) {
            return
        }

        const intervalId = setInterval(() => {
            if (progress >= 100) {
                closeToast && closeToast()
            }

            setProgress(prev => prev + 1)
        }, duration / 100)

        return () => clearInterval(intervalId)
    }, [progress])

    return (
        <>
            <div className="toast relative m-0">
                <div className={`alert alert-soft ${type == "success" ? "alert-success" : type=="error" ? "alert-error" : type == "info" ? "alert-info" : "alert-warning"} rounded relative`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`${type == "success" ? "stroke-success" : type=="error" ? "stroke-error" : type == "info" ? "stroke-info" : "stroke-warning"} h-6 w-6 shrink-0`}>
                        {
                            type == "error" ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            
                        }
                    </svg>

                    <span className="text-xl">{data}</span>

                    <button className="btn btn-circle bg-transparent border-none" onClick={closeToast}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <progress className={`progress ${type == "success" ? "progress-success" : type=="error" ? "progress-error" : type == "info" ? "progress-info" : "progress-warning"} w-[100%] h-0.75 absolute bottom-0 rounded`} value={`${progress}`} max="100"></progress>
                </div>
            </div>
        </>
    )
}

export default Toast