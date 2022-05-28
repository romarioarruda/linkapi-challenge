export interface IGoFileFolder {
  id: string
  type: string
  name: string
  parentFolder: string
  createTime: number
  childs: Array<any>
  code: string
}

export interface IGoFileFile {
  downloadPage: string
  code: string
  parentFolder: string
  fileId: string
  fileName: string
  md5: string
}
