import { FileRepository } from '../domain/repositories/file-repository'
import { IFile } from '../interfaces/IFile'
import { Files } from '../config/models/files'

export default class MongoFileRepository implements FileRepository {
  public async findMany(): Promise<IFile[]> {
    try {
      return Files.find({}).exec()
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
