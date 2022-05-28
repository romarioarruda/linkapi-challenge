import { http } from '../../http/axios'
import { AxiosResponse } from 'axios'

export default class GofileAPI {
  public async CreateFolder(name: string): Promise<AxiosResponse> {
    return http.put('https://api.gofile.io/createFolder', {
      parentFolderId: process.env.GOFILE_ROOT_FOLDER,
      token: process.env.GOFILE_TOKEN,
      folderName: name,
    })
  }
}
