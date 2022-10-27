import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT

app.listen(port, () => {
	console.log(`[server]: Server is listening at localhost:${port}`)
})
