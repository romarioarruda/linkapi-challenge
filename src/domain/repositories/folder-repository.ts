import { IFolder } from '../../interfaces/IFolder'

export interface FolderRepository {
  exists(name: string): Promise<boolean>
  insertOne(folder: IFolder): Promise<boolean>
}
