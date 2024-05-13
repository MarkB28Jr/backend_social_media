const express = require('express')
const { Social } = require('../models')

const index = async (req, res, next) => {
    try {
        res.json(await Social.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
}

const create = async (req, res, next) => {
    try {
        res.json(await Social.create(req.body))
    } catch (error) {
        res.json(400).json(error)
    }
}

const show = async (req, res, next) => {
    try {
        res.json(await Social.findById(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
};

const destroy = async (req, res, next) => {
    try {
        res.json(await Social.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)

    }
}

const update = async (req, res, next) => {
    try {
        res.json(await Social.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
};

module.exports = {
    index,
    create,
    show,
    delete: destroy,
    update
}