import User from "../models/User.js";
import Match from "../models/Match.js";
import Session from "../models/Session.js";

// GET ADMIN ANALYTICS
export const getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalConnections = await Match.countDocuments({
      status: "accepted",
    });

    const totalSessions = await Session.countDocuments();

    res.json({
      totalUsers,
      totalConnections,
      totalSessions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
