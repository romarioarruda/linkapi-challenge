import { FolderRepository } from '../domain/repositories/folder-repository'
import { IFolder } from '../interfaces/IFolder'
import { Folders } from '../config/models/folders'

export default class MongoFolderRepository implements FolderRepository {
  public async exists(name: string): Promise<boolean> {
    try {
      const user = await Folders.exists({ name }).exec()

      if (!user) throw new Error()

      return true
    } catch (_error) {
      return false
    }
  }

  public async insertOne(folder: IFolder): Promise<boolean> {
    try {
      const newFolder = new Folders(folder)

      await newFolder.save()

      return true
    } catch (_error) {
      return false
    }
  }
}
