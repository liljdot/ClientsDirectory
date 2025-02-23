import useModalFormContext from "../hooks/context hooks/useModalFormContext";


const Navbar: React.FC = () => {
    const { modalFormDispatch } = useModalFormContext()

    return (
        <div className="navbar bg-base-100 shadow-sm p-4">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">Clients</a>
            </div>
            <div className="navbar-center">
                <input type="text" placeholder="Search" className="input input-bordered w-48 md:w-auto rounded" />
            </div>
            <div className="navbar-end">
                <a className="btn btn-info rounded" onClick={() => { modalFormDispatch({ type: "OPEN_MODAL", payload: { mode: "add", data: { name: "", id: "", email: "", job: "", isActive: false, rate: ""} } }) }}>Add Client</a>
            </div>
        </div>
    );
}

export default Navbar