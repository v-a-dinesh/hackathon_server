// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: "student" },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    profileImg: { type: String, default: null }
});

// Export both as module.exports and exports
const User = mongoose.model("User", UserSchema);
module.exports = User;
module.exports.User = User;
exports.User = User;