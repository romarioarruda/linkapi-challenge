import schedule from 'node-schedule'
import { DiasDaSemana } from '../enums/days-of-week'
import { MesesDoAno } from '../enums/months-of-year'
import { HorasDoDia } from '../enums/hours-of-day'
import LinkApiUsers from '../clients/linkapi/linkapi-users'
import { Users } from '../domain/Users'
import MongoUserRepository from '../repositories/mongo-user-repository'

const MINUTE = '*/5' //  => roda a cada 5 minutos
const HOUR = HorasDoDia.TODAS
const DAY_OF_MONTH = '*'
const MONTH = MesesDoAno.TODOS
const DAY_OF_WEEK = DiasDaSemana.TODOS

const TIMER = `${MINUTE} ${HOUR} ${DAY_OF_MONTH} ${MONTH} ${DAY_OF_WEEK}`

const api = new LinkApiUsers()

async function runJob(): Promise<void> {
  console.log('Iniciando busca por usuários')
  const dbUser = new MongoUserRepository()
  const users = new Users()
  const apiUserList = await api.getUsers()

  for (let user of apiUserList) {
    const hasUser = await dbUser.exists(user.email._text)
    if (hasUser) {
      console.log('user já existe, pulando...')
      continue
    }

    const userId = Number(user.id._text)
    console.log(`User: ${userId}`)

    const [address, contact] = await Promise.all([
      api.getUserAddress(userId),
      api.getUserContact(userId),
    ])

    users.push(
      `${user.firstName._text} ${user.lastName._text}`,
      user.email._text,
      address?.street._text || '',
      Number(address?.number._text) || 0,
      contact?.phoneNumber._text || '',
    )
  }

  await dbUser.insertMany(users.lista)

  console.log('Busca finalizada.')
}

export default async function jobConvertUsers() {
  runJob()

  schedule.scheduleJob(TIMER, () => runJob())
}
