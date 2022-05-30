import { IFolder } from '../../interfaces/IFolder'
import { IFile } from '../../interfaces/IFile'
import { FolderRepository } from '../../domain/repositories/folder-repository'
import { FileRepository } from '../../domain/repositories/file-repository'

const existsFolder = async (name: string, folderRepo: FolderRepository) => {
  return folderRepo.exists(name)
}

const insertFolder = async (folder: IFolder, folderRepo: FolderRepository) => {
  return folderRepo.insertOne(folder)
}

const listFolders = async (folderRepo: FolderRepository) => {
  return folderRepo.findMany()
}

const findFolder = async (name: string, folderRepo: FolderRepository) => {
  return folderRepo.findOne(name)
}

const insertFile = async (file: IFile, fileRepo: FileRepository) => {
  return fileRepo.insertOne(file)
}

const listFiles = async (fileRepo: FileRepository) => {
  return fileRepo.findMany()
}

export {
  existsFolder,
  insertFolder,
  listFolders,
  findFolder,
  insertFile,
  listFiles,
}
