export type Client = {
    id: string
    name: string
    email: string
    job?: string
    rate?: string | number
    isActive: boolean
}

export type newClient = {
    name: string
    email: string
    job?: string
    rate?: number
    isActive: boolean
}