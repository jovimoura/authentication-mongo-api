const User = require('../models/User')
const generateToken = require('../utils/generateToken')

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body
    const userExists =  await User.findOne({ email })

    if (userExists) res.status(400).json('User exists!')
    
    try {
      const user = await User.create({
        name,
        email,
        password
      })

      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async update(req, res) {
    const user = await User.findById(req.params.id)

    if(!user) res.status(400).json('User not exist!')

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    try {
      const userUpdate = user.save()
      res.status(200).json(userUpdate)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(!user) res.status(400).json('User not exist!')
    
    if(await user.matchPassword(password)) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400).json('User or Email invalids!')
    }
  }
}