import { Client } from "."

export interface GetClientsResponseType {
    status: number
    message: string
    error?: any
    data: Client[]
}

export interface GetClientsResponseErrorType {
    status: number
    message: string
    error: any
    data?: Client[]
}