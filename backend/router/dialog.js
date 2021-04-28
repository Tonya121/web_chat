const express = require("express");

const router = express.Router();

const {
    indexDialog,
    createDialog,
    deleteDialog
} = require("../controllers/dialog");

router.get("/dialogs", indexDialog);
router.delete("/dialogs/:id", deleteDialog);
router.post("/dialogs", createDialog);

module.exports = router;
