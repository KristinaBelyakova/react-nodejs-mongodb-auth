import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRouter.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', authRouter)
export default app
