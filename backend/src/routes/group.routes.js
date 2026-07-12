const router = require("express").Router();
const { listGroups, createGroup, getGroup, addMember, removeGroup } = require("../controllers/group.controller");
const { protect } = require("../middleware/auth.middleware");
router.use(protect); router.route("/").get(listGroups).post(createGroup); router.route("/:id").get(getGroup).delete(removeGroup); router.patch("/:id/members", addMember);
module.exports = router;
