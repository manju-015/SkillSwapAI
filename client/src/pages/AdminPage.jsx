import { useEffect, useState } from "react";

import api from "../api/api";

import toast from "react-hot-toast";

import {
  Shield,
  Users,
  CalendarDays,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

function AdminPage() {
  const [analytics, setAnalytics] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchAdminData = async () => {
    try {
      const { data } = await api.get("/admin/analytics");

      setAnalytics(data);
    } catch (error) {
      toast.error("Failed to load admin data");
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");

      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);

      setUsers((prev) => prev.filter((user) => user._id !== id));

      toast.success("User deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchAdminData();
    fetchUsers();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: analytics?.totalUsers || 0,
      icon: <Users size={18} />,
    },

    {
      title: "Sessions",
      value: analytics?.totalSessions || 0,
      icon: <CalendarDays size={18} />,
    },

    {
      title: "Connections",
      value: analytics?.totalConnections || 0,
      icon: <TrendingUp size={18} />,
    },

    {
      title: "Platform Status",
      value: "Active",
      icon: <Shield size={18} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500 mb-2">Administration</p>

        <h1 className="text-3xl font-semibold text-white-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-3">
          Monitor users, sessions, and overall platform activity.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>

                <h2 className="text-3xl font-semibold mt-2 text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* OVERVIEW */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles size={20} />
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Platform Overview
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-800 mb-3">
              Community Activity
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              Users are actively connecting, collaborating, and booking
              mentorship sessions.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-800 mb-3">
              AI Match Quality
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              AI-powered recommendations are improving engagement and mentor
              discovery.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-800 mb-3">System Health</h3>

            <p className="text-sm text-slate-500 leading-relaxed">
              All core systems are running normally with stable platform
              performance.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-slate-800">
              All Users
            </h2>

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border border-gray-200 rounded-2xl p-4"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {user.name}
                    </h3>

                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>

                  <button
                    onClick={() => deleteUserHandler(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminPage;
