import { FileRepository } from '../domain/repositories/file-repository'
import { IFile } from '../interfaces/IFile'
import { Files } from '../config/models/files'

export default class MongoFileRepository implements FileRepository {
  public async findMany(
    page: number = 0,
    limit: number = 10,
  ): Promise<IFile[]> {
    try {
      const p = page > 0 ? page - 1 : 0
      const skip = p * limit

      const files = await Files.find({}).skip(skip).limit(limit).exec()

      return files ? files : []
    } catch (error) {
      return []
    }
  }

  public async insertOne(file: IFile): Promise<boolean> {
    try {
      const newFile = new Files(file)

      await newFile.save()

      return true
    } catch (_error) {
      return false
    }
  }
}
