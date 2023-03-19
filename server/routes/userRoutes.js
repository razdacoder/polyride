const express = require("express");
const isLoggedIn = require("./../middlewares/authMiddleware");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  loginUser,
  getMe,
} = require("./../controllers/userController");

router.route("/").get(getUsers).post(createUser);

router.route("/auth/login/").post(loginUser);
router.route("/auth/me/").get(isLoggedIn, getMe);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
