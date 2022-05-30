import express, { Request, Response } from 'express'
import { getUsers } from '../../../services/users/users-service'
import MongoUserRepository from '../../../repositories/mongo-user-repository'

const usersRouters = express.Router()

usersRouters.get('/api/v1/users', async (_req: Request, res: Response) => {
  const users = await getUsers(new MongoUserRepository())

  if (!users.length) {
    return res.json({
      total: 0,
      users: [],
    })
  }

  res.json(users)
})

export default usersRouters
