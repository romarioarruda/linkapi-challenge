import path from 'path'
import multer from 'multer'
import crypto from 'crypto'

const uploadPath = path.resolve(__dirname, 'uploads')

export const multerConfig = {
  dest: uploadPath,
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadPath)
    },
    filename: (_req, file: any, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, '')

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key)
      })
    },
  }),
}
