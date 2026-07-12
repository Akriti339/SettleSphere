const User = require("../models/User");

const listUsers = async (req, res, next) => { try { const query = req.query.username ? { username: new RegExp(req.query.username, "i") } : {}; const users = await User.find(query).select("name username email").limit(20); res.json({ users }); } catch (error) { next(error); } };
const getFriends = async (req, res, next) => { try { const user = await User.findById(req.user._id).populate("friends", "name username email"); res.json({ friends: user.friends }); } catch (error) { next(error); } };
const addFriend = async (req, res, next) => { try { if (String(req.user._id) === req.params.id) return res.status(400).json({ message: "You cannot add yourself" }); const friend = await User.findById(req.params.id); if (!friend) return res.status(404).json({ message: "User not found" }); await User.findByIdAndUpdate(req.user._id, { $addToSet: { friends: friend._id } }); await User.findByIdAndUpdate(friend._id, { $addToSet: { friends: req.user._id } }); res.status(204).send(); } catch (error) { next(error); } };
module.exports = { listUsers, getFriends, addFriend };
