import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddClientsResponseErrorType, AddClientsResponseType, GetClientsResponseErrorType, GetClientsResponseType } from "../../types/apiTypes"
import { rejectJson } from "../../components/functions"
import { newClient } from "../../types"

const host = window.location.host
const serverHost = host.slice(0, host.length - 4) + "3000"

const useGetClientsQuery = () => {
    const { data, isLoading, isError, error, refetch, isRefetching } = useQuery<GetClientsResponseType, GetClientsResponseErrorType>({
        queryKey: ["clients"],
        queryFn: () => {
            return fetch(`http://${serverHost}/api/clients`)
                .then(res => res.ok ? res.json() : rejectJson(res))
        }
    })

    return { data, isLoading, isError, error, refetch, isRefetching }
}

const useAddClientMutation = () => {
    const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<AddClientsResponseType, AddClientsResponseErrorType, newClient>({
        mutationFn: (clientObj: newClient) => {
            return fetch(`http://${serverHost}/api/clients`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(clientObj)
            })
                .then(res => res.ok ? res.json : rejectJson(res))
        }
    })

    return {mutate, mutateAsync, isPending, isError, isSuccess}
}

const useDeleteClientMutation = () => {
    const { mutate, isPending, isError, isSuccess, mutateAsync } = useMutation({
        mutationFn: (clientId: string) => {
            return fetch(`http://${serverHost}/api/clients/${clientId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
                .then(res => res.ok ? res.json() : rejectJson(res))
        },
        onSuccess: (...[, id]) => {
            console.log("success")
            // queryClient.setQueryData(["clients"], (oldData: any) => ({ ...oldData, data: [...oldData.data].filter(client => client.id != id) }))
        }
    })

    return { mutate, isPending, isError, isSuccess, mutateAsync }
}

export { useGetClientsQuery, useDeleteClientMutation, useQueryClient, useAddClientMutation }