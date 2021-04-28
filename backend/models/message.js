const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema(
    {
        text: { type: String, require: Boolean },
        dialog: { type: Schema.Types.ObjectId, ref: "Dialog", require: true },
        user: { type: Schema.Types.ObjectId, ref: "User", require: true },
        read: {
            type: Boolean,
            default: false,
        },
        attachments: [{ type: Schema.Types.ObjectId, ref: "UploadFile" }],
    },
    {
        timestamps: true,
        usePushEach: true,
    }
);

module.exports = mongoose.model("Message", MessageSchema);
