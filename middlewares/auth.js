const { User } = require('../models')
const jwt = require('jsonwebtoken')
require("dotenv").config()

const auth = async (req, res, next) => {

/*************** Token Authurization ***************/
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send({ error: 'Authentication Token Missing' })
  }

/*************** Token Authurization Header Split ***************/
  const token = authorization.split(" ")[1]
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(_id).select("_id")
    next()
  } catch (error) {
    return res.status(401).json({ error: error.message })
  }
}

module.exports = {
  auth,
}