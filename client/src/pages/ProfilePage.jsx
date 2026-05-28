import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import api from "../api/api";

import toast from "react-hot-toast";

import { User, Save, Sparkles, Briefcase } from "lucide-react";

import { motion } from "framer-motion";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");

  const [bio, setBio] = useState("");

  const [skillsOffered, setSkillsOffered] = useState("");

  const [skillsWanted, setSkillsWanted] = useState("");

  const [level, setLevel] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");

      setBio(userInfo.bio || "");

      setSkillsOffered(userInfo.skillsOffered?.join(", ") || "");

      setSkillsWanted(userInfo.skillsWanted?.join(", ") || "");

      setLevel(userInfo.level || "");
    }
  }, [userInfo]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put("/users/profile", {
        name,
        bio,
        level,
        skillsOffered: skillsOffered.split(",").map((s) => s.trim()),

        skillsWanted: skillsWanted.split(",").map((s) => s.trim()),
      });

      toast.success("Profile updated");
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* PROFILE HEADER */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-semibold shrink-0">
            {name?.charAt(0)}
          </div>

          <div className="flex-1">
            <p className="text-sm text-slate-500 mb-2">Personal Profile</p>

            <h1 className="text-3xl font-semibold text-slate-800">{name}</h1>

            <p className="text-slate-500 mt-3 leading-relaxed max-w-2xl">
              {bio ||
                "Add a professional bio to showcase your skills and experience."}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              <Briefcase size={16} />

              {level || "Developer"}
            </div>
          </div>
        </div>
      </div>

      {/* FORM CARD */}
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
        {/* TITLE */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <User size={20} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Profile Settings
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage your profile information.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={updateProfile} className="space-y-6">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 text-sm text-slate-800 text-slate-800"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Bio
            </label>

            <textarea
              rows="5"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people about yourself.."
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-slate-800 resize-none"
            />
          </div>

          {/* LEVEL */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Experience Level
            </label>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-slate-800"
            >
              <option value="">Select level</option>

              <option value="Beginner">Beginner</option>

              <option value="Intermediate">Intermediate</option>

              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* SKILLS OFFERED */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Skills Offered
            </label>

            <input
              type="text"
              value={skillsOffered}
              onChange={(e) => setSkillsOffered(e.target.value)}
              placeholder="React, Node.js, AI..."
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-slate-800"
            />
          </div>

          {/* SKILLS WANTED */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Skills Wanted
            </label>

            <input
              type="text"
              value={skillsWanted}
              onChange={(e) => setSkillsWanted(e.target.value)}
              placeholder="DevOps, System Design..."
              className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-slate-800"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl font-medium text-sm flex items-center justify-center gap-2"
          >
            <Save size={18} />

            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* TIP */}
        <div className="mt-8 bg-[#f8fafc] border border-gray-200 rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Sparkles size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">Profile Tip</h3>

            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Profiles with detailed bios and multiple skills receive better
              match recommendations.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
