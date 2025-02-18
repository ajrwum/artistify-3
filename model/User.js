const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614762472/workshop-artistify/default-profile_tbiwcc.jpg",
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
