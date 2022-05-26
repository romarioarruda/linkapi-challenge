import { IUser } from '../interfaces/IUser'

export class Users {
  public readonly lista: IUser[] = []

  public push(
    id: number,
    fullName: string,
    email: string,
    address: string,
    addressNumber: number,
    phoneNumber: string,
  ): void {
    this.lista.push({
      id,
      fullName,
      email,
      address,
      addressNumber,
      phoneNumber,
    })
  }
}
