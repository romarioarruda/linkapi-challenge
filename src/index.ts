import dotenv from 'dotenv'

dotenv.config()

import { mongoOpenConnection } from './config/mongodb'
import jobConvertUsers from './jobs/job-convert-users'

mongoOpenConnection()

jobConvertUsers()
