const express = require("express");
const {
  login,
  register,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get("/users", getUsers);

module.exports = router;