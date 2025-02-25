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

export interface AddClientsResponseType {
    status: number
    message: string
    error?: any
    data: Client
}

export interface AddClientsResponseErrorType {
    status: number
    message: string
    error?: any
    data?: Client
}

export interface UpdateClientsResponseType {
    status: number
    message: string
    error?: any
    data: Client
}

export interface UpdateClientsResponseErrorType {
    status: number
    message: string
    error?: any
    data?: Client
}