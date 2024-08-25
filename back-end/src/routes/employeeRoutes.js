const express = require("express");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeHierarchy,
  searchEmployee,
} = require("../controllers/employeeController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/company/:companyId")
  .get(protect, getEmployees)
  .post(protect, createEmployee);
router
  .route("/:id")
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);
router.route("/hierarchy/:id").get(protect, getEmployeeHierarchy);
router.get("/search/:companyId", protect, searchEmployee);

module.exports = router;
