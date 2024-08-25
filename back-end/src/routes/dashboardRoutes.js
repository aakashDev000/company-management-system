const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getCompanyEmployeeStats,
  getTotalEmployees,
  getTotalCompanies,
} = require("../controllers/dashboardControllers");
const router = express.Router();

router.get("/stats", protect, getCompanyEmployeeStats);
router.get("/total-companies", protect, getTotalCompanies);
router.get("/total-employees", protect, getTotalEmployees);

module.exports = router;
