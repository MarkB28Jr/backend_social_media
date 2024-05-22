const { Community } = require('../models')
require("dotenv").config()

/*************** SOCIAL ***************/
const index = async (req, res, next) => {
  try {
    res.json(await Community.find({}))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const show = async (req, res, next) => {
  try {
    res.json(await Community.findById(req.params.id))
  } catch (error) {
    return res.status(400).json(error);
  }
}
const create = async (req, res, next) => {
  try {
    res.json(await Community.create(req.body))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const destroy = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id)
    if (community) {
      return res.json(await Community.findByIdAndDelete(req.params.id))
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const update = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ success: "Community Updated", community })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const indexComments = async (req, res, next) => {
  try {
    res.json(await Community.find({}))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const createComments = async (req, res, next) => {
  try {
    res.json(await Community.create(req.body))
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
const showComments = async (req, res, next) => {
  try {
    res.json(await Community.findById(req.params.id))
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  index,
  create,
  show,
  delete: destroy,
  update,
  createComments,
  showComments,
  indexComments
}