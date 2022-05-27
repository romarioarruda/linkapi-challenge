import { IUser } from '../interfaces/IUser'

export class Users {
  public readonly lista: IUser[] = []

  public push(
    fullName: string,
    email: string,
    address: string,
    addressNumber: number,
    phoneNumber: string,
  ): void {
    this.lista.push({
      fullName,
      email,
      address,
      addressNumber,
      phoneNumber,
    })
  }
}
