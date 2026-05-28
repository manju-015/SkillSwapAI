import StudyPlan from "../models/StudyPlan.js";

import { generateStudyPlan } from "../services/aiService.js";

// GENERATE AI STUDY PLAN
export const createStudyPlan = async (req, res) => {
  try {
    const { skill, level, hoursPerWeek } = req.body;

    const aiPlan = await generateStudyPlan(skill, level, hoursPerWeek);

    const studyPlan = await StudyPlan.create({
      user: req.user._id,
      skill,
      level,
      hoursPerWeek,
      plan: aiPlan,
    });

    res.status(201).json(studyPlan);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
