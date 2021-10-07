const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, match: /.+\@.+\..+/, unique: true},
    password: {type: String, required: true},
    emailVerifiedAt: {type: Date},
    status: {type: String, required: true, default: "pending"},
  },
  {timestamps: true}
);

module.exports = mongoose.model("Admin", AdminSchema);