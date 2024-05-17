const express = require('express')
const { Social, Community, Message, User } = require('../models')

/*************** SOCIAL ***************/
const index = async (req, res, next) => {
    try {
        res.json(await Social.find({}))
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
const getUserIndex = async (req, res, next) => {
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
    const user = await User.findById(req.user._id);
    try {
       //   const post = await Social.create({ user: user._id, title, body });
        const social = await Social.create({ user: user._id, ...req.body })
        res.status(200).json({ success: "Social Created", social })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const destroy = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)){
        res.status(400).json({error: "Incorrect ID"})
    }

    const social = await SocialfindById(req.params.id)
    if (!social){
        res.status(400).json({error: "Social not Found"})
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
        const social = await Social.findByIdAndUpdate( user._id, req.params.id, req.body, { new: true })
    res.status(200).json({ success: "Social Updated", social })
    // res.json(await Social.findByIdAndUpdate(req.params.id, req.body, { new: true }))
} catch (error) {
    return res.status(400).json({ error: error.message })
}
}

/*************** COMMUNITY ***************/
const indexCommunity = async (req, res, next) => {
    try {
        res.json(await Community.find({}))
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
  
  const showCommunity = async (req, res, next) => {
    try {
        res.json(await Community.findById(req.params.id));
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
  }
  
  /*************** MESSAGE ***************/
const indexMessage = async (req, res, next) => {
    try {
        res.json(await Message.find({}))
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
  }
  const createMessage = async (req, res, next) => {
    try {
        res.json(await Message.create(req.body))
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
  }
  const showMessage = async (req, res, next) => {
    try {
        res.json(await Message.findById(req.params.id));
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
  }


module.exports = {
    index,
    getUserIndex,
    create,
    show,
    delete: destroy,
    update,
    indexCommunity,
    createCommunity,
    showCommunity,
    indexMessage,
    createMessage,
    showMessage,
}