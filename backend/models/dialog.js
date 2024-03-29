const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DialogSchema = Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "User", require: true },
    author: { type: Schema.Types.ObjectId, ref: "User", require: true },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dialog", DialogSchema);
