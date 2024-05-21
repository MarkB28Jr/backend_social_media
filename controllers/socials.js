const { Social, Community, User } = require('../models')
require("dotenv").config()

/*************** SOCIAL ***************/
const index = async (req, res, next) => {
  try {
    res.json(await Social.find({}))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const indexCommunity = async (req, res, next) => {
  try {
    res.json(await Community.find({}))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const show = async (req, res, next) => {
  try {
    const social = await Social.findById(req.params.id).populate('community').exec();
    if (!social) {
        return res.status(404).send('Social Community not found');
    }
    const socials = social.community;
    res.render('flights/show', { social, community });
  } catch (error) {
    return res.status(400).json(error);
  }
}
const showCommunity = async (req, res, next) => {
  try {
    res.json(await Community.findById(req.params.id))
  } catch (error) {
    return res.status(400).json(error);
  }
}

const create = async (req, res, next) => {
  try {
    res.json(await Social.create(req.body))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const createCommunity = async (req, res, next) => {
  try {
    res.json(await Community.create(req.body))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const destroy = async (req, res, next) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ error: "Incorrect ID" })
  // }
  // const social = await SocialfindById(req.params.id)
  // if (!social) {
  //   res.status(400).json({ error: "Social not Found" })
  // }
  // const user = await User.findById(req.body._id)
  // if (!social.user.equals(user.id)) {
  //   return res.status(401).json({ error: 'You are Not Allowed' })
  // }
  try {
    const social = await Social.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: "Social Deleted", social })
    // res.json(await Social.findByIdAndDelete(req.params.id))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const destroyCommunity = async (req, res, next) => {
  // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  //   res.status(400).json({ error: "Incorrect ID" })
  // }
  // const social = await SocialfindById(req.params.id)
  // if (!social) {
  //   res.status(400).json({ error: "Social not Found" })
  // }
  // const user = await User.findById(req.body._id)
  // if (!social.user.equals(user.id)) {
  //   return res.status(401).json({ error: 'You are Not Allowed' })
  // }
  try {
    const community = await Community.findByIdAndDelete(req.params.id)
    res.status(200).json({ success: "Social Deleted", community })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const update = async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ error: 'You are Unauthorized' })
    // }
    // const user = await User.findById(req.body._id)
    // if (req.user._id.toString() !== req.body.user._id.toString()) {
    //   return res.status(401).json({ error: 'You are Not Allowed' })
    // }
    const social = await Social.findByIdAndUpdate( req.params.id, req.body, { new: true })
    res.status(200).json({ success: "Social Updated", social })
    // res.json(await Social.findByIdAndUpdate(req.params.id, req.body, { new: true }))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const updateCommunity = async (req, res, next) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ error: 'You are Unauthorized' })
    // }
    // const user = await User.findById(req.body._id)
    // if (req.user._id.toString() !== req.body.user._id.toString()) {
    //   return res.status(401).json({ error: 'You are Not Allowed' })
    // }
    // res.json(await Social.findByIdAndDelete(req.params.id))
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ success: "Community Updated", community })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  index,
  indexCommunity,
  create,
  createCommunity,
  show,
  showCommunity,
  delete: destroy,
  delete: destroyCommunity,
  update,
  updateCommunity,
}