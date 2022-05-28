import dotenv from 'dotenv'

dotenv.config()

import { mongoOpenConnection } from './config/mongodb'
import jobConvertUsers from './jobs/job-convert-users'
import './application/api_v1'

// Funçoes de inicialização do sistema
mongoOpenConnection()

jobConvertUsers()

//Garantindo o uptime do serviço

//1 - Em caso de erro não tratado que quebraria a execução do software
process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received: \n ${error}`)
})

//2- Em caso de promises não tratadas, o sistema lança um warning que poderia quebrar a execução.
process.on('unhandledRejection', (error) => {
  console.log(`\n unhandledRejection signal received: \n ${error}`)
})
