import { IFolder } from '../../interfaces/IFolder'
import MongoFolderRepository from '../../repositories/mongo-folder-repository'

const repository = new MongoFolderRepository()

const existsFolder = async (name: string) => {
  return repository.exists(name)
}

const insertFolder = async (folder: IFolder) => {
  return repository.insertOne(folder)
}

export { existsFolder, insertFolder }
