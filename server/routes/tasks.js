const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markComplete,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", markComplete);

module.exports = router;
