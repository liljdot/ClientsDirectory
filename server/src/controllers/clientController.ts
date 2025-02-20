import { Request } from "express";
import clientServices from '../services/clientServices'
import { AppResponse } from "../types/express";
import { Client } from "../types";

//GET Requests
const getClients = (req: Request, res: AppResponse) => {
    clientServices.getClients()
        .then(result => {
            if (!result.length) {
                return res.status(404).json({ status: 404, message: "No Clients Found", error: "No Clients Found" })
            }
            return res.status(200).json({ status: 200, message: "Successful", data: result })
        }
        )
        .catch(e => res.status(e.status).json({ status: e.status, message: e.message, error: e.error }))
}

const searchClientByName = (req: Request, res: AppResponse) => {
    const searchParams = req.query.q
    if (!searchParams) {
        return res.status(400).json({ status: 400, message: "No search input", error: "No search input" })
    }

    clientServices.searchClientByName(searchParams.toString())
        .then(result => {
            if (!result.length) {
                return res.status(404).json({ status: 404, message: "No Clients Found", error: "No Clients Found" })
            }
            return res.status(200).json({ status: 200, message: "Successful", data: result })
        }
        )
        .catch(e => res.status(e.status).json({ status: e.status, message: e.message, error: e.error }))
}

//POST Requests
const createClient = (req: Request, res: AppResponse) => {
    //ideally perform all checks on req body before querying db
    //also create check email query before sending data to db, do this for all keys/columns with the unique
    clientServices.createClient(req.body)
        .then(result => {
            if (result.command == "INSERT") {
                return res.status(201).json({ status: 201, message: "Client Added Successfully", data: result.rows[0] })
            }

            return res.status(500).json({ status: 500, message: "Internal Server Error", error: result })
        })
        .catch(e => {
            if (e.constraint == "clients_email_key") {
                return res.status(409).json({ status: 409, error: e, message: "Client with that email already exists" })
            }

            return res.status(500).json({ status: 500, message: "Internal Server Error", error: e })
        })
}


//PATCH Requests
const updateClient = (req: Request, res: AppResponse) => {
    const id = Number(req.params.id)
    const { name, job, rate, isActive, email } = req.body
    clientServices.getSingleClient(id)
        .then((client: Client) => !client ? Promise.reject({ status: 404, message: "Client does not exist", error: "Client does not exist" }) : client)
        .then(client => clientServices.updateClient({ id, name: name || client.name, job: job || client.job, rate: rate || client.rate, isActive: isActive || client.isActive, email: email || client.email }))
        .then(result => {
            if (result.command == "UPDATE") {
                return res.status(200).json({ status: 500, message: "Client Updated Successfully", data: result.rows[0] })
            }

            return res.status(500).json({ status: 500, message: "Internal Server Error", error: result })
        })
        .catch(e => {
            res.status(500).json({ status: 500, message: "Internal Server Error", error: e })
        })
}

//DELETE Requests
const deleteClient = (req: Request, res: AppResponse) => {
    const id = Number(req.params.id)
    clientServices.getSingleClient(id)
        .then((client: Client) => !client ? Promise.reject({ status: 404, message: "Client does not exist", error: "Client does not exist" }) : client)
        .then(() => clientServices.deleteClient(id))
        .then(result => {
            if (result.command == "DELETE") {
                return res.status(200).json({ status: 200, message: "Client Deleted Successfully" })
            }

            return res.status(500).json({ status: 500, message: "Internal Server Error", error: "Internal Server Error" })
        })
        .catch(e => res.status(e.status).json({ status: e.status, message: e.message, error: e.error }))
}

export { getClients, createClient, updateClient, deleteClient, searchClientByName }