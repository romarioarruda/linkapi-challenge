import { IAddress } from './IAddress'

export interface IUser {
  fullName: string
  email: string
  address: IAddress | null
  phoneNumber: string | null
}
