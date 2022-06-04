import { IFile } from '../../interfaces/IFile'

export interface FileRepository {
  findMany(page: number, limit: number): Promise<IFile[]>
  insertOne(file: IFile): Promise<boolean>
}
