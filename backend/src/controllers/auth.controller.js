const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 7 * 24 * 60 * 60 * 1000 };
const publicUser = (user) => ({ id: user._id, name: user.name, username: user.username, email: user.email, group: [], list: [] });

const register = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) return res.status(400).json({ message: "Name, username, email and password are required" });
    const exists = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
    if (exists) return res.status(409).json({ message: "Email or username is already in use" });
    const user = await User.create({ name, username, email, password });
    res.status(201).cookie("token", generateToken(user._id), cookieOptions).json({ user: publicUser(user) });
  } catch (error) { next(error); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password || ""))) return res.status(401).json({ message: "Invalid email or password" });
    res.cookie("token", generateToken(user._id), cookieOptions).json({ user: publicUser(user) });
  } catch (error) { next(error); }
};

const logout = (req, res) => res.clearCookie("token", cookieOptions).status(204).send();
const me = (req, res) => res.json({ user: publicUser(req.user) });
module.exports = { register, login, logout, me };
