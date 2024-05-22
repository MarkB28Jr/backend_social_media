const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err)
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
}

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed)
}

const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET)
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken
}