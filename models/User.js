const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerifiedAt: { type: Date },
    status: { type: String, required: true, default: "pending"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);