import express, { Request, Response } from 'express'
import { getUsers } from '../../../services/users/users-service'

const usersRouter = express.Router()

usersRouter.get('/api/v1/users', async (_req: Request, res: Response) => {
  const users = await getUsers()

  res.json(users)
})

export default usersRouter
