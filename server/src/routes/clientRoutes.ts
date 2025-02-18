import express from "express"
import { createClient, deleteClient, getClients, searchClientByName, updateClient } from '../controllers/clientController'

const clientRoutes = express()

clientRoutes.get('/', getClients)

clientRoutes.get('/search', searchClientByName)

clientRoutes.post('/', createClient)

clientRoutes.patch('/:id', updateClient)

clientRoutes.delete('/:id', deleteClient)

export default clientRoutes