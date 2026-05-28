import Message from "../models/Message.js";

import Notification from "../models/Notification.js";

// GET CHAT HISTORY
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          sender: req.user._id,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: req.user._id,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SAVE MESSAGE
export const saveMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { receiver, message } = req.body;

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver,
      message,
    });

    await Notification.create({
      user: receiver,
      title: "New Message",
      message: `${req.user.name} : ${message}`,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
