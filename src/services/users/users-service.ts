import { UserRepository } from '../../domain/repositories/user-repository'
import { IUser } from '../../interfaces/IUser'

const exists = async (email: string, repository: UserRepository) => {
  return repository.exists(email)
}

const getUsers = async (repository: UserRepository) => {
  return repository.findUsers()
}

const insertMany = async (lista: IUser[], repository: UserRepository) => {
  return repository.insertMany(lista)
}

export { exists, getUsers, insertMany }
