import { http } from '../../http/axios'
import convertXmlToJson from '../../adapters/convert-xml-to-json'
import {
  ILinkApiUser,
  ILinkApiAddress,
  ILinkApiContact,
} from '../../interfaces/ILinkApi'

export default class LinkApiUsers {
  private responseType: any = {
    'application/xhtml+xml': 'xml',
  }

  private page = 1

  public async getUsers(): Promise<ILinkApiUser[]> {
    let page = this.page
    console.log(`Página: ${this.page}`)
    try {
      const users = await http.get(
        `${process.env.API_URL}/users?limit=10&page=${this.page}`,
      )
      const contentType = users.headers['content-type']

      const { data } = this.responseType[contentType]
        ? convertXmlToJson(users.data)
        : users.data

      this.page++

      if (data?.usersList?.item.length) {
        return data.usersList.item
      }

      this.page = 1
      return []
    } catch (error) {
      this.page = page
      return []
    }
  }

  public async getUserAddress(userId: number): Promise<ILinkApiAddress | null> {
    try {
      const address = await http.get(
        `${process.env.API_URL}/users/${userId}/address`,
      )

      const contentType = address.headers['content-type']

      const { data } = this.responseType[contentType]
        ? convertXmlToJson(address.data)
        : address.data

      return data.item ? data.item[0] : null
    } catch (error) {
      return null
    }
  }

  public async getUserContact(userId: number): Promise<ILinkApiContact | null> {
    try {
      const contacts = await http.get(
        `${process.env.API_URL}/users/${userId}/contacts`,
      )

      const contentType = contacts.headers['content-type']

      const { data } = this.responseType[contentType]
        ? convertXmlToJson(contacts.data)
        : contacts.data

      return data.item ?? null
    } catch (error) {
      return null
    }
  }
}
