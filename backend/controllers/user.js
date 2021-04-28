const express = require('express');
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
    console.log(error);
  }
};

exports.users = async (req, res) => {
  User.find({}, function(err, users) {
      if (err) {
          res.send('something went wrong!!!');
      }
      res.json(users);
  });
}
