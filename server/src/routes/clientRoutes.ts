import express from "express"
import { createClient, getClients } from '../controllers/clientController'

const clientRoutes = express()

clientRoutes.get('/', getClients)

clientRoutes.post('/', createClient)

export default clientRoutes