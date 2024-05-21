const bcrypt = require('bcrypt')

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

// const comparePassword = (password, hashed) => {
//   return bcrypt.compare(password, hashed)
// }

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" })
}

const authenticateUser = async (req, res, next) => {
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
  hashPassword,
  // comparePassword,
  authenticateUser,
  createToken
}