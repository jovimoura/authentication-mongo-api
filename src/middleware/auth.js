const jwt = require('jsonwebtoken')
const User = require('../models/User')
const dotEnv = require('dotenv')

dotEnv.config()

const protect = async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select("-password")

      if(decoded.id === req.params.id) {
        next()
      } else {
        res.status(400).json('Unauthorized, Invalid Token!')
      }
    } catch (error) {
      res.status(401).json('Unauthorized, No Token!')
    }
  }
}

module.exports = protect