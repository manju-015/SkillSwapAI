import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { CalendarDays, Shield, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

function AdminSessionsPage() {
  const [sessions, setSessions] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await api.get("/admin/sessions");
      setSessions(data);
    };

    fetchSessions();
  }, []);

  const totalSessions = sessions.length;

  const filteredSessions = sessions.filter(
    (session) =>
      session.mentor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      session.learner?.name?.toLowerCase().includes(search.toLowerCase()) ||
      session.skill?.toLowerCase().includes(search.toLowerCase()),
  );

  const pendingSessions = sessions.filter(
    (session) => session.status === "pending",
  ).length;

  const confirmedSessions = sessions.filter(
    (session) => session.status === "confirmed",
  ).length;

  const cancelledSessions = sessions.filter(
    (session) => session.status === "cancelled",
  ).length;

  console.log("SESSIONS:", sessions);
  console.log("TOTAL:", totalSessions);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Session Management</h1>

        <p className="text-gray-500 mt-2">
          Manage mentorship sessions across the platform.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Sessions</h3>

          <p className="text-3xl font-bold text-slate-800">{totalSessions}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-slate-800">{pendingSessions}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Confirmed</h3>
          <p className="text-3xl font-bold text-slate-800">
            {confirmedSessions}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Cancelled</h3>
          <p className="text-3xl font-bold text-slate-800">
            {cancelledSessions}
          </p>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search mentor, learner or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-80 text-white bg-slate-800 placeholder:text-slate-400"
        />
      </div>

      <p className="text-sm text-slate-500 mb-3">
        Showing {filteredSessions.length} of {sessions.length} sessions
      </p>

      <div className="bg-white rounded-xl shadow p-5">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-slate-600 font-semibold">
                Mentor
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Learner
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Skill
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Date
              </th>
              <th className="text-left py-3 text-slate-600 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session._id} className="border-b">
                <td className="py-4 text-slate-800">{session.mentor?.name}</td>

                <td className="py-4 text-slate-800">{session.learner?.name}</td>

                <td className="py-4 text-slate-800">{session.skill}</td>

                <td className="py-4 text-slate-800">
                  {new Date(session.date).toLocaleDateString()}
                </td>

                <td className="py-4">
                  {session.status === "pending" && (
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  )}

                  {session.status === "confirmed" && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      Confirmed
                    </span>
                  )}

                  {session.status === "cancelled" && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                      Cancelled
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminSessionsPage;
