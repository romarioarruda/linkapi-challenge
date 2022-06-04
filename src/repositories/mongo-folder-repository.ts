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

  public async findOne(name: string): Promise<IFolder> {
    try {
      return Folders.findOne({ name }).exec()
    } catch (error) {
      return error
    }
  }

  public async findMany(
    page: number = 0,
    limit: number = 10,
  ): Promise<IFolder[]> {
    try {
      const p = page > 0 ? page - 1 : 0
      const skip = p * limit

      const folders = await Folders.find({}).skip(skip).limit(limit).exec()

      return folders ? folders : []
    } catch (error) {
      return []
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
