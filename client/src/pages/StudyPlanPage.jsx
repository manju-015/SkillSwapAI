import { useState } from "react";

import api from "../api/api";

import toast from "react-hot-toast";

import { Brain, Sparkles, Wand2, BookOpen } from "lucide-react";

import { motion } from "framer-motion";

function StudyPlanPage() {
  const [skill, setSkill] = useState("");

  const [goal, setGoal] = useState("");

  const [loading, setLoading] = useState(false);

  const [plan, setPlan] = useState("");

  const generatePlan = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/ai/generate", {
        skill,
        goal,
      });

      setPlan(data.plan);

      toast.success("Study plan generated");
    } catch (error) {
      toast.error("Failed to generate plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500 mb-2">AI Assistant</p>

        <h1 className="text-3xl font-semibold text-white-800">
          AI Study Planner
        </h1>

        <p className="text-slate-500 mt-3">
          Generate a personalized roadmap to master new skills.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Brain size={20} />
            </div>

            <h2 className="text-xl font-semibold text-slate-800">
              Generate Plan
            </h2>
          </div>

          <form onSubmit={generatePlan} className="grid md:grid-cols-2 gap-5">
            {/* SKILL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skill
              </label>

              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="React, DevOps, Node.js..."
                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 text-sm text-slate-800"
              />
            </div>

            {/* GOAL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Learning Goal
              </label>

              <textarea
                rows="4"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Describe what you want to achieve..."
                className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 text-sm text-slate-800 resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2"
            >
              <Wand2 size={18} />

              {loading ? "Generating..." : "Generate Study Plan"}
            </button>
          </form>
        </motion.div>

        {/* RESULT */}
        {plan && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen size={20} />
              </div>

              <h2 className="text-xl font-semibold text-slate-800">
                Your AI Roadmap
              </h2>
            </div>

            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-6">
              <pre className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed font-sans">
                {plan}
              </pre>
            </div>
          </motion.div>
        )}

        {/* TIP */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
            <Sparkles size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">AI Tip</h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              The more detailed your goal is, the more personalized and accurate
              your study roadmap becomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyPlanPage;
