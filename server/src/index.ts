import express, { Response } from "express"
import { AppRequest } from "./types/express"

const app = express()

app.get('/', (req: AppRequest, res) => {
    // res.send("Hello, it works!")
    req.data = "infi"
})

app.listen(3000, () => {
    console.log("Server is Listening..")
})