const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { listSettlements, createSettlement } = require("../controllers/settlement.controller");
router.use(protect); router.route("/").get(listSettlements).post(createSettlement);
module.exports = router;
