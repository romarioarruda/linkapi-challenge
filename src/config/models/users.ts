import { model, Schema } from 'mongoose'

export const Users = model(
  'users',
  new Schema({
    fullName: String,
    email: String,
    address: String,
    addressNumber: Number,
    phoneNumber: String,
  }),
)
