import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import socket from 'socket.io'

const app = express()

const io = socket(8080)

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

app.use(cors())
app.use(express.json())

app.listen(3333)

export { app }