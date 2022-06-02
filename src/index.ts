import dotenv from 'dotenv'

dotenv.config()

import { mongoOpenConnection, mongoCloseConnection } from './config/mongodb'
import jobConvertUsers from './jobs/job-convert-users'
import apiV1 from './application/api_v1'

// Funçoes de inicialização do sistema
mongoOpenConnection()
  .then((_) => {
    jobConvertUsers()
    apiV1()
  })
  .catch((err) => console.error('DB CONECTION ERRO: ', String(err)))

//Garantindo o uptime do serviço

//1 - Em caso de erro não tratado que quebraria a execução do software
process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received: \n ${error}`)
})

//2- Em caso de promises não tratadas, o sistema lança um warning que poderia quebrar a execução.
process.on('unhandledRejection', (error) => {
  console.log(`\n unhandledRejection signal received: \n ${error}`)
})

//Gracefull shutdown => Garantindo o encerramento de toda a aplicação corretamente.
function graceFullShutDown(event: string) {
  return async (code: number) => {
    console.log(`\n${event} => signal received with code: ${code} \n`)

    await mongoCloseConnection()

    process.exit(0)
  }
}

// disparado  no ctrl + c
process.on('SIGINT', graceFullShutDown('SIGINT'))

// disparado no kill
process.on('SIGTERM', graceFullShutDown('SIGTERM'))

process.on('exit', (code: number) => {
  console.log(`\nexit signal received with code: ${code} \n`)
})
