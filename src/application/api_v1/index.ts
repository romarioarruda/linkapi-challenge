import express, { Express } from 'express'
import usersRouter from './routes/users-router'

const app: Express = express()
const port = process.env.API_PORT || 4000

app.use('/', usersRouter)

app.listen(port, () => {
  console.log(`API v1 escutando na porta: ${port}`)
})
