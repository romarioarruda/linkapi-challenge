import { UserRepository } from '../../domain/repositories/user-repository'
import { IUser } from '../../interfaces/IUser'

const exists = async (email: string, repository: UserRepository) => {
  return repository.exists(email)
}

const getUsers = async (
  page: number,
  limit: number,
  repository: UserRepository,
) => {
  return repository.findMany(page, limit)
}

const insertMany = async (lista: IUser[], repository: UserRepository) => {
  return repository.insertMany(lista)
}

export { exists, getUsers, insertMany }
