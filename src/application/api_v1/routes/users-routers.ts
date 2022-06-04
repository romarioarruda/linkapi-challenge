import express, { Request, Response } from 'express'
import { getUsers } from '../../../services/users/users-service'
import MongoUserRepository from '../../../repositories/mongo-user-repository'

const usersRouters = express.Router()

usersRouters.get('/api/v1/users', async (req: Request, res: Response) => {
  const page = Number(req?.query?.page) || 1

  const users = await getUsers(page, 10, new MongoUserRepository())

  if (!users.length) {
    return res.json({
      total: 0,
      users: [],
    })
  }

  res.json(users)
})

export default usersRouters
