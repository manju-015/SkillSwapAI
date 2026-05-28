import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    hoursPerWeek: {
      type: Number,
      required: true,
    },

    plan: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);

export default StudyPlan;
