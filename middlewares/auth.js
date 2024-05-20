const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'my-secret-key';

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

// function authenticateToken(req, res, next) {
//   const cookies = req.headers.cookie;
//   if (cookies) {
//     const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
//     if (tokenCookieString) {
//       const token = tokenCookieString.split('=')[1];
//       if (token) {
//         jwt.verify(token, jwtSecret, {}, (err, userData) => {
//           if (err) throw err;
//           const {userId, username} = userData;
//           req.userId = userId;
//           req.username = username;
//           next();
//         });
//       }
//     }
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// }

module.exports = {
  hashPassword,
  comparePassword,
  // authenticateToken
}