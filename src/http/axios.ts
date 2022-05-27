import axios from 'axios'

const http = axios.create({
  baseURL: `${process.env.API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${process.env.API_TOKEN}`,
  },
})

export { http }
