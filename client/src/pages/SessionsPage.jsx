import { useEffect, useState } from "react";

import api from "../api/api";

import toast from "react-hot-toast";

import { CalendarDays, Clock3, Users, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

function SessionsPage() {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const { data } = await api.get("/sessions/my");

      setSessions(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500 mb-2">Mentorship</p>

        <h1 className="text-3xl font-semibold text-white-800">Sessions</h1>

        <p className="text-slate-500 mt-3">
          Manage your scheduled mentorship and learning sessions.
        </p>
      </div>

      {/* EMPTY */}
      {sessions.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            No Sessions Scheduled
          </h2>

          <p className="text-slate-500">
            Your upcoming mentorship sessions will appear here.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {sessions.map((session, index) => (
            <motion.div
              key={session._id}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.04,
              }}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users size={20} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {session.skill}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Mentor: {session.mentor?.name || "Unknown"}
                    </p>
                  </div>
                </div>

                <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                  Scheduled
                </span>
              </div>

              {/* DATE */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CalendarDays size={16} />

                  {new Date(session.date).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock3 size={16} />

                  {new Date(session.date).toLocaleTimeString()}
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-6 bg-slate-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Stay prepared before the session begins and review your
                  learning goals beforehand.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionsPage;
