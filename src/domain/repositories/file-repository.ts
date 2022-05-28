import { IFile } from '../../interfaces/IFile'

export interface FileRepository {
  findMany(): Promise<IFile[]>
  insertOne(file: IFile): Promise<boolean>
}
