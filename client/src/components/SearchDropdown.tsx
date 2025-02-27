import { EventHandler, useEffect, useRef, useState } from "react"
import { Client } from "../types"
import { useSearchClientsQuery } from "../hooks/api/clientsApi"

interface Props {

}

const SearchDropdown: React.FC<Props> = () => {
    const [searchInput, setSearchInput] = useState<string>("")
    const dropDownRef = useRef<HTMLDivElement>(null)
    const { data, isLoading, refetch, isRefetching, isError } = useSearchClientsQuery(searchInput)
    let clients: Client[] = []

    const handleSearchFocus: EventHandler<React.FocusEvent> = () => {
        dropDownRef.current?.classList.add("dropdown-open")
    }

    const handleSearchBlur: EventHandler<React.FocusEvent> = () => {
        dropDownRef.current?.classList.remove("dropdown-open")
    }

    const handleSearchChange: EventHandler<React.ChangeEvent<HTMLInputElement>> = e => {
        setSearchInput(e.target.value.trim())
    }

    useEffect(() => {
        if (!searchInput.length) {
            return
        }

        refetch()
    }, [searchInput])

    clients = data?.data || []

    if (!searchInput) {
        clients = []
    }

    if (isError) {
        clients = []
    }

    return (
        <>
            <div ref={dropDownRef} className="dropdown dropdown-center">
                <input onFocus={handleSearchFocus} onBlur={handleSearchBlur} onChange={handleSearchChange} type="text" placeholder="Search" className="input input-bordered w-48 md:w-auto rounded" />
                <ul tabIndex={0} className="dropdown-content border menu bg-base-100 rounded z-1 w-85 sm:w-150 md:w-200 p-2 shadow-sm mt-3">
                    {!searchInput ? <li>Enter Search Term</li>
                        :
                        isLoading || isRefetching ? <span className="loading loading-bars loading-xl"></span>
                            :
                            clients.length ?
                                (<li>
                                    <table className="table">
                                        <thead>
                                            {
                                                clients.map(client =>
                                                    <tr key={client.id}>
                                                        <td>{client.name}</td>
                                                        <td>{client.email}</td>
                                                        <td>{client.job}</td>
                                                    </tr>)
                                            }
                                        </thead>
                                    </table>

                                </li>) :
                                <>No Items Match Search Term</>}
                    {/* <li><a>Item 2</a></li> */}
                </ul>
            </div>
        </>
    )
}

export default SearchDropdown