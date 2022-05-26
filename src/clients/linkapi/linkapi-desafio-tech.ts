import { http } from '../../http/axios'
import convertXmlToJson from '../../adapters/convert-xml-to-json'
import { ILinkApiUser } from '../../interfaces/ILinkApiUser'

export default class LinkApiDesafioTech {
  private responseType: any = {
    'application/xhtml+xml': 'xml',
  }

  private page = 1

  public async getUsers(): Promise<ILinkApiUser[]> {
    console.log('REQUEST PAGE: ', this.page)
    const users = await http.get(
      `${process.env.API_URL}/users?limit=10&page=${this.page}`,
    )
    const contentType = users.headers['content-type']

    const { data } = this.responseType[contentType]
      ? convertXmlToJson(users.data)
      : users.data

    this.page++
    return data.usersList.item ?? []
  }

  public async getUserAddress(userId: number): Promise<void> {
    const address = await http.get(
      `${process.env.API_URL}/users/${userId}/address`,
    )

    console.log('USERS:: ', address.data)
  }

  public async getUserContact(userId: number): Promise<void> {
    const contacts = await http.get(
      `${process.env.API_URL}/users/${userId}/contacts`,
    )

    console.log('USERS:: ', contacts.data)
  }
}
