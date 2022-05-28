import { IFolder } from '../../interfaces/IFolder'
import { IFile } from '../../interfaces/IFile'
import MongoFolderRepository from '../../repositories/mongo-folder-repository'
import MongoFileRepository from '../../repositories/mongo-file-repository'

const folderRepo = new MongoFolderRepository()
const fileRepo = new MongoFileRepository()

const existsFolder = async (name: string) => {
  return folderRepo.exists(name)
}

const insertFolder = async (folder: IFolder) => {
  return folderRepo.insertOne(folder)
}

const listFolders = async () => {
  return folderRepo.findMany()
}

const findFolder = async (name: string) => {
  return folderRepo.findOne(name)
}

const insertFile = async (file: IFile) => {
  return fileRepo.insertOne(file)
}

export { existsFolder, insertFolder, listFolders, findFolder, insertFile }
