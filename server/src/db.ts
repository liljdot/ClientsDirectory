import { configDotenv } from "dotenv"
import { Client, QueryResult } from "pg";
configDotenv()

const { DB_URL } = process.env

const db = new Client({
    connectionString: DB_URL
})

db.connect()

db.on("error", err => console.log(err))

const query = (text: string, params?: any): Promise<QueryResult<any>> => {
    return db.query(text, params)
}

export { query }