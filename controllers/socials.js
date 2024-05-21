const { Social, User } = require('../models')
// const { hashPassword, comparePassword } = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
require("dotenv").config()

/*************** SOCIAL ***************/
const index = async (req, res, next) => {
  try {
    res.json(await Social.find({}))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const show = async (req, res, next) => {
  try {
    res.json(await Social.findById(req.params.id));
  } catch (error) {
    return res.status(400).json(error);
  }
}

const create = async (req, res, next) => {
  // const user = await User.findById(req.user._id);
  try {
    //   const post = await Social.create({ user: user._id, title, body });
    // const social = await Social.create({ user: user._id, ...req.body })
    res.json(await Social.create(req.body))
    // res.status(200).json({ success: "Social Created", social })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const destroy = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Incorrect ID" })
  }
  const social = await SocialfindById(req.params.id)
  if (!social) {
    res.status(400).json({ error: "Social not Found" })
  }
  const user = await User.findById(req.body._id)
  if (!social.user.equals(user.id)) {
    return res.status(401).json({ error: 'You are Not Allowed' })
  }
  try {
    await Social.deleteOne()
    res.status(200).json({ success: "Social Deleted", social })
    // res.json(await Social.findByIdAndDelete(req.params.id))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const update = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'You are Unauthorized' })
    }
    const user = await User.findById(req.body._id)
    if (req.user._id.toString() !== req.body.user._id.toString()) {
      return res.status(401).json({ error: 'You are Not Allowed' })
    }
    const social = await Social.findByIdAndUpdate(user._id, req.params.id, req.body, { new: true })
    res.status(200).json({ success: "Social Updated", social })
    // res.json(await Social.findByIdAndUpdate(req.params.id, req.body, { new: true }))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

/*************** Register User | Login User ***************/
// const registerUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await hashPassword(password);
//     const user = new User({ username, password: hashedPassword });
//     await user.save();

//     // Generate a JWT
//     const token = generateToken(user);

//     // Send the JWT to the client
//     res.status(201).send({ message: 'User registered successfully', token });
//   } catch (error) {
//     res.status(500).send({ message: 'Error registering user' });
//   }
// }
// const registerUser = async (req, res, next) => {
//   const { username, password } = req.body
//   // Check if all fields are used && Password Length
//   if (!username || (!password && password.length < 8)) {
//     return res.json({ error: "All fields are required" })
//   }
//   // Check Username exist
//   const exist = await User.findOne({ username })
//   if (exist) {
//     return res.json({ error: "Username Already Exist" })
//   }
//   // Hash password
//   const hashedPassword = await hashPassword(password)
//   const createToken = (_id) => {
//     return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "10d" })
//   }
//   // Register User
//   const user = await User.create({ username, password: hashedPassword })
//   const token = createToken(user._id)
//   res.cookie('token', token).status(201).json({ id: user._id })
// }

// const registerUser = async (req, res, next) => {
//   const { name, email, password } = req.body
//   // Check if all fields are used
//   if (!email || !password) {
//     return res.json({ error: "All fields are required" })
//   }
//   // Check Password Length
//   if (!password || password.length < 8) {
//     return res.json({ error: "Password must be at least 8 characters" })
//   }
//   // Check Email
//   const exist = await User.findOne({ email })
//   if (exist) {
//     return res.json({ error: "Email Already Exist" })
//   }
//   // Hash password
//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)
//   try {
//     // Register User
//     const user = await User.create({ name, email, password: hashedPassword })
//     // Create JWT Token
//     const token = createToken(user._id)
//     res.status(201).json({ email, token })
//   } catch (error) {
//     return res.status(500).json({ error: error.message })
//   }
// }

// const loginUser = async (req, res, next) => {
// const { email, password } = req.body
// // Check if all fields are used
// if (password.length < 8) {
//   return res.json({ error: "Password must be at least 8 characters" })
// }
// if (!email || !password) {
//   return res.json({ error: "All fields are required" })
// }
// // Check Email
// const user = await User.findOne({ email })
// if (!user) {
//   return res.json({ error: "Email Does Not Exists" })
// }
// // Check Password
// const matchPassword = await bcrypt.compare(password, user.password)
// if (matchPassword) {
//   // jwt.sign({ email: user.email, id: user._id, name: user.name }, process.JWT_SECRET, {}, (err, token) => {
//   //   if (err) throw err

//   // })
// }
// if (!matchPassword) {
//   return res.json({ error: "Wrong Password" })
// }
// try {
//   // Create JWT Token
//   const token = createToken(user._id)
//   // return res.cookie('token', token).json(user)
//   res.status(201).json({ email, token })
// } catch (error) {
//   return res.json({ error: error.message })
// }
// }


// const logOff = async () => {
//   res.cookie('token', '', { SameSite: 'none', secure: true }).json({ message: "Logged Out" })
// }

// const getProfile = (req, res) => {
//   try {
//     const token = req.cookies?.token;
//     if (!token) {
//       return res.status(401).json({ error: 'No token found' });
//     }
//     jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
//       if (err) {
//         console.error('Error verifying JWT token:', err);
//         return res.status(401).json({ error: 'Invalid token' });
//       }
//       res.json(userData);
//     });
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// const getProfile = (req, res) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'No token found' });
//     }
//     jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
//       if (err) {
//         console.error('Error verifying JWT token:', err);
//         return res.status(401).json({ error: 'Invalid token' });
//       }
//       // Query the database for the user with the given ID
//       const user = db.users.find(user => user.id === userData.userId);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json(user.profile);
//     });
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

module.exports = {
  index,
  create,
  show,
  delete: destroy,
  update,
  // getProfile,
  // registerUser,
  // logOff
}