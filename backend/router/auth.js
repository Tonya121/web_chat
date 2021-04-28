const express = require("express");

const { signUp } = require("../controllers/user");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);

module.exports = authRouter;
