import { IUser } from '../../interfaces/IUser'
import MongoUserRepository from '../../repositories/mongo-user-repository'

const repository = new MongoUserRepository()

const exists = async (email: string) => {
  return repository.exists(email)
}

const getUsers = async () => {
  return repository.findUsers()
}

const insertMany = async (lista: IUser[]) => {
  return repository.insertMany(lista)
}

export { exists, getUsers, insertMany }
