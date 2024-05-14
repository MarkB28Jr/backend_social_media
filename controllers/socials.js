const express = require('express')
const { Social } = require('../models')

const index = async (req, res, next) => {
    try {
        res.json(await Social.find({}))
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const create = async (req, res, next) => {
    try {
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
};

module.exports = {
    index,
    create,
    show,
    delete: destroy,
    update
}