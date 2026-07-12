const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { listUsers, getFriends, addFriend } = require("../controllers/user.controller");
router.use(protect); router.get("/", listUsers); router.get("/friends", getFriends); router.post("/:id/friends", addFriend);
module.exports = router;
