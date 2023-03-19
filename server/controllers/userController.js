const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Get Users
// @route   Get /api/v1/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc    Get User
// @route   Get /api/v1/users
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error(`No user with id: "${req.params.id}" found in DB`);
  }
  res.status(200).json(user);
});

// @desc    Get Current Logged In User
// @route   Get /api/v1/users/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error(`No user with id: "${req.params.id}" found in DB`);
  }
  res.status(200).json(user);
});

// @desc    Create Users
// @route   POST /api/v1/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please add all required fields");
  }
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    res.status(400);
    throw new Error("User with email already exists");
  }
  const hashPassword = await bcrypt.hash(req.body.password, 12);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    userType: req.body.userType ? req.body.userType : "rider",
  });
  res.status(201).json(user);
});

// @desc    Update Users
// @route   PUT /api/v1/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error(`No user with id: "${req.params.id}" found in DB`);
  }
  if (!req.body) {
    res.status(400);
    throw new Error("Provide at least a field to update");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedUser);
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error(`No user with id: "${req.params.id}" found in DB`);
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

// @desc    Login User
// @route   DELETE /api/v1/users/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Please add all required fields");
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!user || isPasswordValid == false) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign(
    { _id: user.id, email: req.body.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  const { name, _id, email, createdAt, updatedAt, userType } = user;

  res
    .status(200)
    .json({ _id, name, email, createdAt, updatedAt, userType, token });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  getMe,
};
