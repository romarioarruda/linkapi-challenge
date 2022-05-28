import { IFolder } from '../../interfaces/IFolder'

export interface FolderRepository {
  exists(name: string): Promise<boolean>
  findMany(): Promise<IFolder[]>
  insertOne(folder: IFolder): Promise<boolean>
}
