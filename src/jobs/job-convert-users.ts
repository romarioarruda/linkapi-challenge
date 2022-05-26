import schedule from 'node-schedule'
import { DiasDaSemana } from '../enums/days-of-week'
import { MesesDoAno } from '../enums/months-of-year'
import { HorasDoDia } from '../enums/hours-of-day'
import LinkApiDesafioTech from '../clients/linkapi/linkapi-desafio-tech'

const MINUTE = '*/1' // */1 => a cada 1 minuto
const HOUR = HorasDoDia.TODAS
const DAY_OF_MONTH = '*'
const MONTH = MesesDoAno.TODOS
const DAY_OF_WEEK = DiasDaSemana.TODOS

const TIMER = `${MINUTE} ${HOUR} ${DAY_OF_MONTH} ${MONTH} ${DAY_OF_WEEK}`

const api = new LinkApiDesafioTech()

async function runJob() {
  console.log('Iniciando busca por usuários')
  const users = await api.getUsers()

  for (let user of users) {
    console.log(user)
  }
}

export default function jobConvertUsers(): void {
  runJob()

  schedule.scheduleJob(TIMER, () => runJob())
}
