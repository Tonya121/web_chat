const express = require("express");

const router = express.Router();

const {
    deleteMessage,
    createMessage,
    indexMessage,
} = require("../controllers/message");

router.get("/messages", indexMessage);
router.post("/messages", createMessage);
router.delete("/messages", deleteMessage);

module.exports = router;
