const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "jury"],
    default: "user",
  },
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Email is not valid"],
    // unique: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  address: String,
  city: String,
  // companyCountry: String,
  country: {
    type: String,
    default: "null",
    required: true,
  },
  nationality: {
    type: String,
    default: "null",
    // required: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    // default: "4plus+++",
    required: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    // default: "4plus+++",
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match. Please try again",
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  preferredLanguage: String,
  interestedIn: Array,
  eventoId: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
