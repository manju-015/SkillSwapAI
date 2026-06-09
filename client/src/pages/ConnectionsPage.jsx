import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import api from "../api/api";

import toast from "react-hot-toast";

import { Users, MessageCircle, CalendarDays, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

function ConnectionsPage() {
  const [matches, setMatches] = useState([]);

  const [sessionData, setSessionData] = useState({});

  const { userInfo } = useSelector((state) => state.auth);

  const [connections, setConnections] = useState([]);

  const fetchMatches = async () => {
    try {
      const { data } = await api.get("/matches/connected");

      setMatches(data);
    } catch (error) {
      toast.error("Failed to load connections");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const bookSession = async (mentorId) => {
    const session = sessionData[mentorId];

    if (!session?.skill || !session?.date || !session?.time) {
      toast.error("Please provide skill, date, and time");
      return;
    }

    const sessionDateTime = new Date(`${session.date}T${session.time}`);

    try {
      await api.post("/sessions/create", {
        mentor: mentorId,
        skill: session.skill,
        date: sessionDateTime,
      });

      toast.success("Session booked");

      setSessionData({
        ...sessionData,
        [mentorId]: {
          skill: "",
          date: "",
          time: "",
        },
      });
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  const removeConnection = async (matchId) => {
    try {
      await api.delete(`/matches/${matchId}`);

      setMatches((prev) => prev.filter((match) => match._id !== matchId));
      toast.success("Connection removed");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove connection");
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-sm text-slate-500 mb-2">Network</p>

          <h1 className="text-3xl font-semibold text-white-800">
            My Connections
          </h1>

          <p className="text-slate-500 mt-3">
            Collaborate, learn, and grow together.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-blue-600" />

            <div>
              <p className="text-xs text-slate-500">Total Connections</p>

              <h3 className="text-lg font-semibold text-slate-800">
                {matches.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* EMPTY */}
      {matches.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            No Connections Yet
          </h2>

          <p className="text-slate-500">
            Start networking with developers and mentors.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {matches.map((match, index) => {
            const otherUser =
              match.sender._id === userInfo._id ? match.receiver : match.sender;

            return (
              <motion.div
                key={match._id}
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
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-semibold shrink-0">
                    {otherUser.name?.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                          {otherUser.name}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                          {otherUser.email}
                        </p>
                      </div>

                      <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                        {otherUser.level || "Developer"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mt-4">
                      {otherUser.bio || "No bio added yet."}
                    </p>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">
                    Skills Offered
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {otherUser.skillsOffered?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CHAT */}
                <Link
                  to={`/chat/${otherUser._id}`}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Open Chat
                </Link>

                {/* SESSION */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays size={18} className="text-blue-600" />

                    <h3 className="text-lg font-semibold text-slate-800">
                      Book Session
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Skill to learn"
                      value={sessionData[otherUser._id]?.skill || ""}
                      onChange={(e) => {
                        setSessionData((prev) => ({
                          ...prev,
                          [otherUser._id]: {
                            ...prev[otherUser._id],
                            skill: e.target.value,
                          },
                        }));
                      }}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm text-slate-600"
                    />

                    <div className="flex flex-col gap-2">
                      <input
                        type="date"
                        value={sessionData[otherUser._id]?.date || ""}
                        onChange={(e) => {
                          setSessionData((prev) => ({
                            ...prev,
                            [otherUser._id]: {
                              ...prev[otherUser._id],
                              date: e.target.value,
                            },
                          }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-600 text-sm"
                      />

                      <input
                        type="time"
                        value={sessionData[otherUser._id]?.time || ""}
                        onChange={(e) => {
                          setSessionData((prev) => ({
                            ...prev,
                            [otherUser._id]: {
                              ...prev[otherUser._id],
                              time: e.target.value,
                            },
                          }));
                        }}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-slate-600 text-sm"
                      />
                    </div>

                    <button
                      onClick={() => bookSession(otherUser._id)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 transition text-white py-3 rounded-xl font-medium text-sm"
                    >
                      Schedule Session
                    </button>
                  </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6 flex justify-end">
                  <button
                    onClick={() => removeConnection(match._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ConnectionsPage;
