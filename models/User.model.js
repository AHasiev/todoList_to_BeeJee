const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  login: {
    type: String,
    unique: true,
  },
  password: String,
  email: String,
  role: {
    type: String,
    default: 'user'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
