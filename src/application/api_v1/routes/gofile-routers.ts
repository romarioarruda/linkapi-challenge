import express, { Request, Response } from 'express'
import GofileAPI from '../../../clients/gofile/gofile-api'
import { IGoFileFolder } from '../../../interfaces/IGoFileApi'
import {
  existsFolder,
  insertFolder,
} from '../../../services/files/files-service'

const gofileRouters = express.Router()

gofileRouters.post(
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

export default gofileRouters
