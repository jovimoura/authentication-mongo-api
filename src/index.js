const express = require('express')
const db = require('./config/db')
const dotEnv = require('dotenv')
const routes = require('./routes/index.routes')

const app = express()

dotEnv.config()
db()
app.use(express.json())
app.use('/api/users', routes)

app.listen(5000, () => {
  console.log('Server is on!')
})