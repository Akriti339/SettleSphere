const router = require("express").Router(); const { createExpense, removeExpense } = require("../controllers/expense.controller"); const { protect } = require("../middleware/auth.middleware");
router.use(protect); router.post("/", createExpense); router.delete("/:id", removeExpense); module.exports = router;
