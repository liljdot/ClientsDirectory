import { Request } from "express";
import clientServices from '../services/clientServices'
import { AppResponse } from "../types/express";

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

const createClient = (req: Request, res: AppResponse) => {
    //ideally perform all checks on req body before querying db
    //also create check email query before sending data to db, do this for all keys/columns with the unique
    clientServices.createClient(req.body)
        .then(result => {
            if (result.command == "INSERT") {
                return res.status(201).json({ status: 201, message: "Client Added Successfully", data: req.body })
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

export { getClients, createClient }