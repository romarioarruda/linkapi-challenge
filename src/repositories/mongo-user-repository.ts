import { UserRepository } from '../domain/repositories/user-repository'
import { IUser } from '../interfaces/IUser'
import { Users } from '../config/models/users'

export default class MongoUserRepository implements UserRepository {
  public async exists(email: string): Promise<boolean> {
    try {
      const user = await Users.exists({ email }).exec()

      if (!user) throw new Error()

      return true
    } catch (_error) {
      return false
    }
  }

  public async insertMany(users: IUser[]): Promise<boolean> {
    try {
      await Users.insertMany(users)

      return true
    } catch (_error) {
      return false
    }
  }

  public async findMany(
    page: number = 0,
    limit: number = 10,
  ): Promise<IUser[]> {
    try {
      const p = page > 0 ? page - 1 : 0
      const skip = p * limit
      const users = await Users.find({}).skip(skip).limit(limit).exec()

      return users ? users : []
    } catch (_error) {
      return []
    }
  }
}
