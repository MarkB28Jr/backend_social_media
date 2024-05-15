const express = require('express')
const { Social, Community, Message } = require('../models')

/*************** SOCIAL ***************/
const index = async (req, res, next) => {
    try {
        res.json(await Social.find({}))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const create = async (req, res, next) => {
    try {
        // const social = await createSocial(req.body);
        // const community = await Community.findById(social.community); // fetch community
        // social.community = community; // populate community field
        // res.json(social);
        res.json(await Social.create(req.body))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const show = async (req, res, next) => {
    try {
        res.json(await Social.findById(req.params.id));
    } catch (error) {
        return res.status(400).json(error);
    }
};
const destroy = async (req, res, next) => {
    try {
        res.json(await Social.findByIdAndDelete(req.params.id))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const update = async (req, res, next) => {
    try {
        res.json(await Social.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

/*************** COMMUNITY ***************/
const indexCommunity = async (req, res, next) => {
    try {
        res.json(await Community.find({}))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const createCommunity = async (req, res, next) => {
    try {
        res.json(await Community.create(req.body))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const showCommunity = async (req, res, next) => {
    try {
        res.json(await Community.findById(req.params.id));
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

/*************** COMMUNITY ***************/
const indexMessage = async (req, res, next) => {
    try {
        res.json(await Message.find({}))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const createMessage = async (req, res, next) => {
    try {
        res.json(await Message.create(req.body))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}
const showMessage = async (req, res, next) => {
    try {
        res.json(await Message.findById(req.params.id));
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}


module.exports = {
    index,
    create,
    show,
    delete: destroy,
    update,
    createCommunity,
    showCommunity,
    indexMessage,
    createMessage,
    showMessage,
}