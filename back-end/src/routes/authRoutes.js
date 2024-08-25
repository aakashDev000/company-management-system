const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshToken,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", protect, logoutAdmin);
router.post("/refresh", refreshToken);

module.exports = router;
