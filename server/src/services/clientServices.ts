import { QueryResult } from "pg";
import { query } from "../db";
import { NewClient } from "../types";

const getClients = (): Promise<any[]> => {
    return query('SELECT * FROM clients')
        .then(res => res.rows)
        .catch(error => Promise.reject({ status: 500, message: "Internal Server Error", error }))
}

const createClient = ({name, job, rate, isActive, email}: NewClient): Promise<QueryResult<any>> => {
    return query(`INSERT INTO clients (
        name,
        email,
        job,
        rate,
        isActive)
        VALUES (
        '${name}',
        '${email}',
        '${job}',
        ${rate},
        ${isActive})`)
        .then(res => res)
        .catch(e => Promise.reject(e))
}

export default { getClients, createClient }