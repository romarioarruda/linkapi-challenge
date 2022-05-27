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

  public async findUsers(): Promise<IUser[]> {
    try {
      return Users.find({}).exec()
    } catch (_error) {
      return []
    }
  }
}
