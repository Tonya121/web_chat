const express = require("express");
const bcrypt = require("bcrypt");

const createJWToken = require("../services/createJWToken");

const createUser = require("../services/user");
const User = require("../models/user");

exports.signUp = async (req, res, next) => {
    try {
        const newUser = req.body;
        const savedUser = await createUser(newUser);

        res.status(200).json({
            success: true,
            data: savedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
        console.log(error);
    }
};

exports.users = async (req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => {
            return res.status(404).json({
                status: "error",
                message: err,
            });
        });
};

exports.getMe = (req, res) => {
    const id = req.user && req.user._id;
    User.findById(id, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.json(user);
    });
};

exports.updateLastSeen = (req, _, next) => {
    if (req.user) {
        User.findOneAndUpdate(
            { _id: req.user.id },
            {
                last_seen: new Date(),
            },
            { new: true }
        );
    }
    next();
};

exports.login = (req, res) => {
    const postData = {
        email: req.body.email,
        password: req.body.password,
    };

    User.findOne({ email: postData.email }, (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (bcrypt.compareSync(postData.password, user.password)) {
            const token = createJWToken(user);
            res.json({
                status: "success",
                token,
            });
        } else {
            res.status(403).json({
                status: "error",
                message: "Incorrect password or email",
            });
        }
    });
};
