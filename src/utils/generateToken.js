const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

dotEnv.config()

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = generateToken