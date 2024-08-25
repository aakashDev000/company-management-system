const express = require("express");
const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(protect, createCompany).get(protect, getCompanies);
router.route("/:id").put(protect, updateCompany).delete(protect, deleteCompany);

module.exports = router;
