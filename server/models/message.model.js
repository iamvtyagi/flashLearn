const mongoose = require("mongoose");


const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    media: { type: String, default: null }, // Image, video, etc.
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically createdAt & updatedAt save karega
);

module.exports = mongoose.model("Message", MessageSchema);
