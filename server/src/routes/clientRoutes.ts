import express from "express"
import { createClient, deleteClient, getClients, updateClient } from '../controllers/clientController'

const clientRoutes = express()

clientRoutes.get('/', getClients)

clientRoutes.post('/', createClient)

clientRoutes.patch('/:id', updateClient)

clientRoutes.delete('/:id', deleteClient)

export default clientRoutes