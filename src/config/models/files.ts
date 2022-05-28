import { model, Schema } from 'mongoose'

export const Files = model(
  'Files',
  new Schema({
    folderParentId: String,
    fileId: String,
    name: String,
  }),
)
