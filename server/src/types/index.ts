export interface Client {
    id: number,
    name: string,
    email: string,
    job: string,
    rate: number,
    isActive: boolean
}

export interface UpdateClientInfo extends Pick<Client, "id">, Partial<Pick<Client, "email" | "isActive" | "job" | "name" | "rate">> {}

export interface NewClient {
    name: string,
    email: string,
    job: string,
    rate: number,
    isActive: boolean
}