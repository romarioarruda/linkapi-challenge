import { model, Schema } from 'mongoose'

export const Folders = model(
  'Folders',
  new Schema({
    folderId: String,
    name: String,
  }),
)
