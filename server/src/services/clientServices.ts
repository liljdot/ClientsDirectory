import { QueryResult } from "pg";
import { query } from "../db";
import { NewClient, UpdateClientInfo } from "../types";


const getClients = (): Promise<any[]> => {
    return query('SELECT * FROM clients')
        .then(res => res.rows)
        .catch(error => Promise.reject({ status: 500, message: "Internal Server Error", error }))
}

const getSingleClient = (id: number) => {
    return query(`SELECT * FROM clients WHERE id = ${id}`)
        .then(res => res.rows[0])
        .catch(error => Promise.reject({ status: 500, message: "Internal Server Error", error }))
}

const searchClientByName = (searchParams: string): Promise<any[]> => {
    return query(`SELECT * FROM clients
        WHERE name ILIKE '%${searchParams}%'
        OR email ILIKE '%${searchParams}%'
        OR job ILIKE '%${searchParams}%'`)
        .then(res => res.rows)
        .catch(error => Promise.reject({ status: 500, message: "Internal Server Error", error }))
}

const createClient = ({ name, job, rate, isActive, email }: NewClient): Promise<QueryResult<any>> => {
    return query(`INSERT INTO clients (
        name,
        email,
        job,
        rate,
        "isActive")
        VALUES (
        '${name}',
        '${email}',
        '${job}',
        ${rate},
        ${isActive})
        RETURNING *`)
        .then(res => res)
        .catch(e => Promise.reject(e))
}

const updateClient = ({ id, name, job, rate, isActive, email }: UpdateClientInfo): Promise<QueryResult<any>> => {
    return query(`UPDATE clients
        SET name = '${name}', job = '${job}', rate = ${rate}, "isActive" = ${isActive}, email = '${email}'
        WHERE id = ${id}
        RETURNING *`)
        .then(res => res)
        .catch(e => Promise.reject(e))
}


const deleteClient = (id: number) => {
    return query(`DELETE FROM clients
        WHERE id = ${id}`)
        .catch(e => Promise.reject(e))
}

export default { getClients, createClient, getSingleClient, updateClient, deleteClient, searchClientByName }