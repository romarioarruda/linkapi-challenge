import mongoose from 'mongoose'

export const mongoOpenConnection = async (): Promise<void> => {
  await mongoose.connect(`${process.env.MONGO_HOST}/linkapi_challenge`, {
    maxPoolSize: 10,
  })
}

export const mongoCloseConnection = async (): Promise<void> => {
  await mongoose.connection.close()
}
