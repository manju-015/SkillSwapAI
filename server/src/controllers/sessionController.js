import Session from "../models/Session.js";

// CREATE SESSION
export const createSession = async (req, res) => {
  try {
    const { mentor, skill, date } = req.body;

    const session = await Session.create({
      mentor,
      learner: req.user._id,
      skill,
      date,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY SESSIONS
export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ mentor: req.user._id }, { learner: req.user._id }],
    })
      .populate("mentor", "name email")
      .populate("learner", "name email")
      .sort({ date: 1 });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SESSION STATUS
export const updateSessionStatus = async (req, res) => {
  try {
    const { sessionId, status } = req.body;

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    session.status = status;

    await session.save();

    res.status(200).json(session);
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
