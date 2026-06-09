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
    console.log("GET ALL USERS HIT");

    const users = await User.find().select("-password");

    console.log("USERS COUNT:", users.length);

    res.json(users);
  } catch (error) {
    console.log("GET ALL USERS ERROR:", error);
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

    if (user.isAdmin) {
      return res.status(400).json({
        message: "Admin cannot be deleted",
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

// BLOCK USER
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        message: "Admin cannot be blocked",
      });
    }

    user.isBlocked = true;

    await user.save();

    res.json({
      message: "User blocked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UNBLOCK USER
export const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        message: "Admin cannot be modified",
      });
    }

    user.isBlocked = false;

    await user.save();

    res.json({
      message: "User unblocked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("mentor", "name email")
      .populate("learner", "name email")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllConnections = async (req, res) => {
  try {
    const connections = await Match.find()
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.json(connections);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
