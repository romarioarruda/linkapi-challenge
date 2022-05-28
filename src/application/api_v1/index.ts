import express, { Express } from 'express'
import usersRouters from './routes/users-routers'
import gofileRouters from './routes/gofile-routers'

const app: Express = express()
const port = process.env.API_PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', usersRouters)
app.use('/', gofileRouters)

app.listen(port, () => {
  console.log(`API v1 escutando na porta: ${port}`)
})
