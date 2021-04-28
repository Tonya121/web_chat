const express = require("express");

const { Dialog } = require("../models/dialog");
const { Message } = require("../models/message");

const updateReadStatus = (res, userId, dialogId) => {
    Message.updateMany(
        { dialog: dialogId, user: { $ne: userId } },
        { $set: { read: true } },
        (err) => {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: err,
                });
            } else {
                global.io.emit("SERVER:MESSAGES_READED", {
                    userId,
                    dialogId,
                });
            }
        }
    );
};

const indexMessage = (req, res) => {
    const dialogId = req.query.dialog;
    const userId = req.user._id;

    this.updateReadStatus(res, userId, dialogId);

    Message.find({ dialog: dialogId })
        .populate(["dialog", "user", "attachments"])
        .exec(function (err, messages) {
            if (err) {
                return res.status(404).json({
                    status: "error",
                    message: "Messages not found",
                });
            }
            res.json(messages);
        });
};

const createMessage = (req, res) => {
    const userId = req.user._id;

    const postData = {
        text: req.body.text,
        dialog: req.body.dialog_id,
        attachments: req.body.attachments,
        user: userId,
    };

    const message = new Message(postData);

    this.updateReadStatus(res, userId, req.body.dialog_id);

    message
        .save()
        .then((obj) => {
            obj.populate("dialog user attachments", (err, message) => {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        message: err,
                    });
                }

                DialogModel.findOneAndUpdate(
                    { _id: postData.dialog },
                    { lastMessage: message._id },
                    { upsert: true },
                    function (err) {
                        if (err) {
                            return res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }
                    }
                );

                res.json(message);

                global.io.emit("SERVER:NEW_MESSAGE", message);
            });
        })
        .catch((reason) => {
            res.json(reason);
        });
};

const deleteMessage = (req, res) => {
    const id = req.query.id;
    const userId = req.user._id;

    Message.findById(id, (err, message) => {
        if (err || !message) {
            return res.status(404).json({
                status: "error",
                message: "Message not found",
            });
        }

        if (message.user.toString() === userId) {
            const dialogId = message.dialog;
            message.remove();

            Message.findOne(
                { dialog: dialogId },
                {},
                { sort: { created_at: -1 } },
                (err, lastMessage) => {
                    if (err) {
                        res.status(500).json({
                            status: "error",
                            message: err,
                        });
                    }

                    Dialog.findById(dialogId, (err, dialog) => {
                        if (err) {
                            res.status(500).json({
                                status: "error",
                                message: err,
                            });
                        }

                        if (!dialog) {
                            return res.status(404).json({
                                status: "not found",
                                message: err,
                            });
                        }

                        dialog.lastMessage = lastMessage
                            ? lastMessage.toString()
                            : "";
                        dialog.save();
                    });
                }
            );

            return res.json({
                status: "success",
                message: "Message deleted",
            });
        } else {
            return res.status(403).json({
                status: "error",
                message: "Not have permission",
            });
        }
    });
};

module.exports = {
    updateReadStatus,
    deleteMessage,
    createMessage,
    indexMessage,
};
