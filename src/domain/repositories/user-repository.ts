import { IUser } from '../../interfaces/IUser'

export interface UserRepository {
  exists(email: string): Promise<boolean>
  findUsers(): Promise<IUser[]>
  insertMany(users: IUser[]): Promise<boolean>
}
