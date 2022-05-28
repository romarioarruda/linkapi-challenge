import { IFolder } from '../../interfaces/IFolder'

export interface FolderRepository {
  exists(name: string): Promise<boolean>
  findMany(): Promise<IFolder[]>
  findOne(name: string): Promise<IFolder>
  insertOne(folder: IFolder): Promise<boolean>
}
