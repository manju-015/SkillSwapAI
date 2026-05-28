import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Match = mongoose.model("Match", matchSchema);

export default Match;
