const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    userType: {
      type: String,
      enum: ["rider", "driver"],
      default: "rider",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
