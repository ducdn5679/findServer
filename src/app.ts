import routes from '@/routes'
import cors from 'cors'
import express from 'express'
const app = express()

app.get('/v1/status', (_req, res) => {
  res.setHeader('Service', 'ServerCheck')
  res.json({ Status: 'OK', Service: 'ServerCheck' })
})

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use('', routes)

export default app
