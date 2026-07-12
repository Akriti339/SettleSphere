const Settlement = require("../models/Settlement");

const listSettlements = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.payerId) filter.payer = req.query.payerId;
    if (req.query.receiverId) filter.receiver = req.query.receiverId;
    const settlements = await Settlement.find(filter).sort("-createdAt");
    res.json({ settlements });
  } catch (error) { next(error); }
};

const createSettlement = async (req, res, next) => {
  try {
    const { receiverId, amount } = req.body;
    if (!receiverId || !amount) return res.status(400).json({ message: "Receiver and amount are required" });
    const settlement = await Settlement.create({ payer: req.user._id, receiver: receiverId, amount });
    res.status(201).json({ settlement });
  } catch (error) { next(error); }
};

module.exports = { listSettlements, createSettlement };
