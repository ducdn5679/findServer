import app from './app'
const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  console.info(`server listening on ${APP_PORT}`)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception: ' + err)
})
