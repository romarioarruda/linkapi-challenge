import FormData from 'form-data'
import { IFolder } from '../../interfaces/IFolder'
import { IFile } from '../../interfaces/IFile'
import { FolderRepository } from '../../domain/repositories/folder-repository'
import { FileRepository } from '../../domain/repositories/file-repository'
import { IGoFileFolder, IGoFileFile } from '../../interfaces/IGoFileApi'
import GofileAPI from '../../clients/gofile/gofile-api'

const existsFolder = async (name: string, folderRepo: FolderRepository) => {
  return folderRepo.exists(name)
}

const apiCreateFolder = async (name: string): Promise<IGoFileFolder> => {
  try {
    const gofile = new GofileAPI()

    const { data } = await gofile.CreateFolder(name)

    return Promise.resolve(data.data as IGoFileFolder)
  } catch (error) {
    return Promise.reject({
      response: { status: 500, data: 'Falha ao tentar criar pasta' },
    })
  }
}

const insertFolder = async (folder: IFolder, folderRepo: FolderRepository) => {
  return folderRepo.insertOne(folder)
}

const listFolders = async (
  page: number,
  limit: number,
  folderRepo: FolderRepository,
) => {
  return folderRepo.findMany(page, limit)
}

const findFolder = async (name: string, folderRepo: FolderRepository) => {
  return folderRepo.findOne(name)
}

const apiCreateFile = async (formData: FormData): Promise<IGoFileFile> => {
  try {
    const gofile = new GofileAPI()

    const { data } = await gofile.UploadFile(formData)

    return Promise.resolve(data.data as IGoFileFile)
  } catch (error) {
    return Promise.reject({
      response: { status: 500, data: 'Falha no upload do arquivo.' },
    })
  }
}

const insertFile = async (file: IFile, fileRepo: FileRepository) => {
  return fileRepo.insertOne(file)
}

const listFiles = async (
  page: number,
  limit: number,
  fileRepo: FileRepository,
) => {
  return fileRepo.findMany(page, limit)
}

export {
  existsFolder,
  apiCreateFolder,
  insertFolder,
  listFolders,
  findFolder,
  apiCreateFile,
  insertFile,
  listFiles,
}
