import express from "express"
import cors from "cors"
import clientRoutes from "./routes/clientRoutes"

const app = express()

const port: number = 3000

app.use(cors())
app.use(express.json())
app.use('/api/clients', clientRoutes)

app.get('/', (req, res) => {
    res.send("Hello, it works!")
})

app.listen(port, () => {
    console.log("Server is listening on port " + port)
})