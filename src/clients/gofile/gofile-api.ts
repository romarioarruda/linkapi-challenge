import { http } from '../../http/axios'
import FormData from 'form-data'
import { AxiosResponse } from 'axios'

export default class GofileAPI {
  public async CreateFolder(name: string): Promise<AxiosResponse> {
    return http.put('https://api.gofile.io/createFolder', {
      parentFolderId: process.env.GOFILE_ROOT_FOLDER,
      token: process.env.GOFILE_TOKEN,
      folderName: name,
    })
  }

  public async UploadFile(formData: FormData): Promise<AxiosResponse> {
    return http({
      baseURL: 'https://store3.gofile.io',
      method: 'POST',
      url: '/uploadFile',
      headers: { 'content-type': 'multipart/form-data;' },
      data: formData,
    })
  }
}
