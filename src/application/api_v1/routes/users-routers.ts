import express, { Request, Response } from 'express'
import { getUsers } from '../../../services/users/users-service'

const usersRouters = express.Router()

usersRouters.get('/api/v1/users', async (_req: Request, res: Response) => {
  const users = await getUsers()

  if (!users.length) {
    return res.json({
      total: 0,
      users: [],
    })
  }

  res.json(users)
})

export default usersRouters
