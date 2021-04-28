const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

async function createUser(payload) {
    return await User.find({ email: payload.email })
        .exec()
        .then((user) => {
            if (user.length > 0) {
                throw new Error("User already exist");
            }
            return bcrypt.hash(payload.password, 10).then((hashed) => {
                const newUser = new User({
                    name: payload.name,
                    email: payload.email,
                    password: hashed,
                });
                newUser.save();
            });
        });
}

module.exports = createUser;
