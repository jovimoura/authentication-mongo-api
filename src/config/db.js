const mongoose = require('mongoose')
const dotEnv = require('dotenv')

dotEnv.config()

const URL = process.env.DB_URL + ''

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true
    })

    console.log(`MongoDB are connected`)
  } catch (error) {
    console.log(`Error: ${error}`)
    process.exit(1)
  }
}

module.exports = connectDb