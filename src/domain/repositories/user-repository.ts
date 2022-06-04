import { IUser } from '../../interfaces/IUser'

export interface UserRepository {
  exists(email: string): Promise<boolean>
  findMany(page: number, limit: number): Promise<IUser[]>
  insertMany(users: IUser[]): Promise<boolean>
}
