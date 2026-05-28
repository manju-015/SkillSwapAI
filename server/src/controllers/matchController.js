import Match from "../models/Match.js";
import Notification from "../models/Notification.js";

// SEND MATCH REQUEST
export const sendMatchRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    // prevent self request
    if (req.user._id.toString() === receiverId) {
      return res.status(400).json({
        message: "You cannot match yourself",
      });
    }

    // check existing match
    const existingMatch = await Match.findOne({
      $or: [
        {
          sender: req.user._id,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: req.user._id,
        },
      ],
    });

    if (existingMatch) {
      return res.status(400).json({
        message: "Connection already exists or request pending",
      });
    }

    const match = await Match.create({
      sender: req.user._id,
      receiver: receiverId,
    });

    await Notification.create({
      user: receiverId,
      title: "Connection Request",
      message: `${req.user.name} sent you a connection request`,
    });

    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET RECEIVED MATCH REQUESTS
export const getReceivedRequests = async (req, res) => {
  try {
    const requests = await Match.find({
      receiver: req.user._id,
      status: "pending",
    }).populate("sender", "name email bio skillsOffered level");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// RESPOND TO MATCH REQUEST
export const respondToMatchRequest = async (req, res) => {
  try {
    const { matchId, status } = req.body;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({
        message: "Match request not found",
      });
    }

    // only receiver can respond
    if (match.receiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    match.status = status;

    await match.save();

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ACCEPTED MATCHES
export const getAcceptedMatches = async (req, res) => {
  try {
    const matches = await Match.find({
      status: "accepted",

      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate("sender", "name email skillsOffered")
      .populate("receiver", "name email skillsOffered");

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// MARK REQUESTS AS SEEN
export const markRequestsSeen = async (req, res) => {
  try {
    await Match.updateMany(
      {
        receiver: req.user._id,
        seen: false,
      },
      {
        seen: true,
      },
    );

    res.json({
      message: "Seen updated",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE CONNECTION
export const removeConnection = async (req, res) => {
  try {
    const { matchId } = req.params;

    const match = await Match.findById(matchId);

    if (!match) {
      return res.status(404).json({
        message: "Connection not found",
      });
    }

    // only connected users can remove
    const isParticipant =
      match.sender.toString() === req.user._id.toString() ||
      match.receiver.toString() === req.user._id.toString();

    if (!isParticipant) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await match.deleteOne();

    res.json({
      message: "Connection removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
