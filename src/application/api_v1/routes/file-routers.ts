import express, { Request, Response } from 'express'
import multer from 'multer'
import FormData from 'form-data'
import { createReadStream, unlink } from 'fs'
import { multerConfig } from '../../../config/multer'
import GofileAPI from '../../../clients/gofile/gofile-api'
import { IGoFileFolder, IGoFileFile } from '../../../interfaces/IGoFileApi'
import {
  existsFolder,
  insertFolder,
  listFolders,
  findFolder,
  insertFile,
} from '../../../services/files/files-service'

const fileRouters = express.Router()

fileRouters.post(
  '/api/v1/createFolder',
  async (req: Request, res: Response) => {
    try {
      if (!req.body.name)
        throw new Error('Precisa informar um nome para a pasta')

      const hasFolder = await existsFolder(req.body.name)

      if (hasFolder)
        throw new Error(`Já existe uma pasta com esse nome: ${req.body.name}`)

      const gofile = new GofileAPI()

      const { data } = await gofile.CreateFolder(req.body.name)
      const folder = data.data as IGoFileFolder

      await insertFolder({ folderId: folder.id, name: folder.name })

      res.json({ message: 'Pasta criada com sucesso!' })
    } catch (error) {
      const status = error?.response?.status || 400
      const message = error?.response?.data || String(error)
      res.status(status).json({ message })
    }
  },
)

fileRouters.get('/api/v1/folders', async (_req, res: Response) => {
  const folders = await listFolders()

  if (!folders) {
    return res.json({
      total: 0,
      folders: [],
    })
  }

  res.json(folders)
})

fileRouters.post(
  '/api/v1/uploadFile',
  multer(multerConfig).single('file'),
  async (req: Request, res: Response) => {
    const path: string = req?.file?.path || ''
    try {
      const folderName = req?.body?.folderName || null

      if (!folderName)
        throw Error('Informe o nome da pasta onde será salvo o arquivo')
      if (!path) throw Error('Escolha um arquivo!')

      const getFolder = await findFolder(folderName)

      if (!getFolder?.folderId) {
        throw Error(
          'A pasta informada ainda não existe!\n Para continuar, tente cria-la.',
        )
      }

      const stream = createReadStream(path)
      const gofile = new GofileAPI()
      const formData = new FormData()

      formData.append('token', process.env.GOFILE_TOKEN)
      formData.append('folderId', getFolder.folderId)
      formData.append('file', stream)
      const resp: IGoFileFile = (await gofile.UploadFile(formData)).data

      await insertFile({
        folderParentId: resp.parentFolder,
        fileId: resp.fileId,
        name: resp.fileName,
      })

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

export default fileRouters
