import express, { Request, Response } from 'express'
import multer from 'multer'
import FormData from 'form-data'
import { createReadStream, unlink } from 'fs'
import { multerConfig } from '../../../config/multer'
import MongoFolderRepository from '../../../repositories/mongo-folder-repository'
import MongoFileRepository from '../../../repositories/mongo-file-repository'
import {
  existsFolder,
  insertFolder,
  listFolders,
  findFolder,
  insertFile,
  listFiles,
  apiCreateFolder,
  apiCreateFile,
} from '../../../services/files/files-service'

const fileRouters = express.Router()

fileRouters.post('/api/v1/folders', async (req: Request, res: Response) => {
  try {
    if (!req.body.name) {
      throw new Error('Precisa informar um nome para a pasta')
    }

    const hasFolder = await existsFolder(
      req.body.name,
      new MongoFolderRepository(),
    )

    if (hasFolder) {
      throw new Error(`Já existe uma pasta com esse nome: ${req.body.name}`)
    }

    const folder = await apiCreateFolder(req.body.name)

    await insertFolder(
      { folderId: folder.id, name: folder.name },
      new MongoFolderRepository(),
    )

    res.json({ message: 'Pasta criada com sucesso!' })
  } catch (error) {
    const status = error?.response?.status || 400
    const message = error?.response?.data || String(error)
    res.status(status).json({ message })
  }
})

fileRouters.get('/api/v1/folders', async (req, res: Response) => {
  const page = Number(req?.query?.page) || 1

  const folders = await listFolders(page, 10, new MongoFolderRepository())

  if (!folders.length) {
    return res.json({
      total: 0,
      folders: [],
    })
  }

  res.json(folders)
})

fileRouters.post(
  '/api/v1/files',
  multer(multerConfig).single('file'),
  async (req: Request, res: Response) => {
    const path: string = req?.file?.path || ''
    const folderName = req?.body?.folderName || null

    try {
      if (!folderName) {
        throw Error('Informe o nome da pasta onde será salvo o arquivo')
      }

      if (!path) throw Error('Escolha um arquivo!')

      const getFolder = await findFolder(
        folderName,
        new MongoFolderRepository(),
      )

      if (!getFolder?.folderId) {
        throw Error(
          'A pasta informada ainda não existe!\n Para continuar, tente cria-la.',
        )
      }

      const stream = createReadStream(path)
      const formData = new FormData()

      formData.append('token', process.env.GOFILE_TOKEN)
      formData.append('folderId', getFolder.folderId)
      formData.append('file', stream)

      const fileSaved = await apiCreateFile(formData)

      await insertFile(
        {
          folderParentId: fileSaved.parentFolder,
          fileId: fileSaved.fileId,
          name: fileSaved.fileName,
        },
        new MongoFileRepository(),
      )

      unlink(path, (err) => {
        if (err) throw Error()
      })

      res.json({ message: 'Upload concluído com sucesso!' })
    } catch (error) {
      unlink(path, (err) => {
        if (err) console.log('Sem arquivo para limpar.')
      })
      const status = error?.response?.status || 400
      const message = error?.response?.data || String(error)
      res.status(status).json({ message })
    }
  },
)

fileRouters.get('/api/v1/files', async (req, res: Response) => {
  const page = Number(req?.query?.page) || 1

  const files = await listFiles(page, 10, new MongoFileRepository())

  if (!files.length) {
    return res.json({
      total: 0,
      files: [],
    })
  }

  res.json(files)
})

export default fileRouters
