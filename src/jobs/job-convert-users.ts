import schedule from 'node-schedule'
import { DiasDaSemana } from '../enums/days-of-week'
import { MesesDoAno } from '../enums/months-of-year'
import { HorasDoDia } from '../enums/hours-of-day'
import LinkApiUsers from '../clients/linkapi/linkapi-users'
import { Users } from '../domain/Users'
import { exists, insertMany } from '../services/users/users-service'

const MINUTE = '*/5' //  => roda a cada 5 minutos
const HOUR = HorasDoDia.TODAS
const DAY_OF_MONTH = '*'
const MONTH = MesesDoAno.TODOS
const DAY_OF_WEEK = DiasDaSemana.TODOS

const TIMER = `${MINUTE} ${HOUR} ${DAY_OF_MONTH} ${MONTH} ${DAY_OF_WEEK}`

const linkApi = new LinkApiUsers()

async function runJob(): Promise<void> {
  console.log('Iniciando busca por usuários')

  const usersEntity = new Users()
  const apiUserList = await linkApi.getUsers()

  for (let user of apiUserList) {
    const hasUser = await exists(user.email._text)
    if (hasUser) {
      console.log('user já existe, pulando...')
      continue
    }

    const userId = Number(user.id._text)
    console.log(`User: ${userId}`)

    const [address, contact] = await Promise.all([
      linkApi.getUserAddress(userId),
      linkApi.getUserContact(userId),
    ])

    usersEntity.push(
      `${user.firstName._text} ${user.lastName._text}`,
      user.email._text,
      address?.street._text || '',
      Number(address?.number._text) || 0,
      contact?.phoneNumber._text || '',
    )
  }

  await insertMany(usersEntity.lista)

  console.log('Busca finalizada.')
}

export default async function jobConvertUsers() {
  schedule.scheduleJob(TIMER, () => runJob())
}
