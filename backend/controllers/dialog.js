const Dialog = require("../models/dialog");
const Message = require("../models/message");

const indexDialog = (req, res) => {
    //todo set to params id
    const userId = req.body._id;

    Dialog.find()
        .or([{ author: userId }, { partner: userId }])
        .populate(["author", "partner"])
        .populate({
            path: "lastMessage",
            populate: {
                path: "user",
            },
        })
        .exec(function (err, dialogs) {
            if (err) {
                return res.status(404).json({
                    message: "Dialogs not found",
                });
            }
            return res.json(dialogs);
        });
};

const createDialog = (req, res) => {
    console.log(req.user._id, "req.user._id")
    const postData = {
        author: req.user._id,
        partner: req.body.partner,
    };

    Dialog.findOne(
        {
            author: req.user._id,
            partner: req.body.partner,
        },
        (err, dialog) => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: err,
                });
            }
            if (dialog) {
                return res.status(403).json({
                    status: "error",
                    message: "Такой диалог уже есть",
                });
            } else {
                const dialog = new Dialog(postData);

                dialog
                    .save()
                    .then((dialogObj) => {
                        const message = new Message({
                            text: req.body.text,
                            user: req.user._id,
                            dialog: dialogObj._id,
                        });

                        message
                            .save()
                            .then(() => {
                                dialogObj.lastMessage = message._id;
                                dialogObj.save().then(() => {
                                    res.json(dialogObj);
                                    this.io.emit("SERVER:DIALOG_CREATED", {
                                        ...postData,
                                        dialog: dialogObj,
                                    });
                                });
                            })
                            .catch((reason) => {
                                res.json(reason);
                            });
                    })
                    .catch((err) => {
                        res.json({
                            status: "error",
                            message: err,
                        });
                    });
            }
        }
    );
};

const deleteDialog = (req, res) => {
    const id = req.params.id;
    Dialog.findOneAndRemove({ _id: id })
        .then((dialog) => {
            if (dialog) {
                res.json({
                    message: `Dialog deleted`,
                });
            }
        })
        .catch(() => {
            res.json({
                message: `Dialog not found`,
            });
        });
};

module.exports = {
    indexDialog,
    createDialog,
    deleteDialog,
};
