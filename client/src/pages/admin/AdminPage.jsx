import { useEffect, useState } from "react";

import api from "../../api/api";

import toast from "react-hot-toast";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

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

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

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
      console.log("FULL ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      toast.error(error.response?.data?.message || "Failed to load users");
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

  const blockUserHandler = async (id) => {
    try {
      await api.put(`/admin/users/block/${id}`);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: true } : user,
        ),
      );

      toast.success("User blocked");
    } catch (error) {
      toast.error(error.response?.data?.message || "Block failed");
    }
  };

  const unblockUserHandler = async (id) => {
    try {
      await api.put(`/admin/users/unblock/${id}`);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: false } : user,
        ),
      );

      toast.success("User unblocked");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unblock failed");
    }
  };

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
        <p className="text-sm text-slate-500 mt-0 mb-2">Administration</p>

        <h1 className="text-3xl font-semibold text-white-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-3">
          Monitor users, sessions, and overall platform activity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <Users size={20} className="text-blue-600" />
            <h2 className="font-semibold text-slate-800">User Management</h2>
          </div>
        </div>

        <div
          onClick={() => navigate("/admin/sessions")}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-green-600" />
            <h2 className="font-semibold text-slate-800">Session Management</h2>
          </div>
        </div>

        <div
          onClick={() => navigate("/admin/connections")}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-purple-600" />
            <h2 className="font-semibold text-slate-800">
              Connection Management
            </h2>
          </div>
        </div>
        <div
          onClick={() => navigate("/admin/reports")}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-red-500" />
            <h2 className="font-semibold text-slate-800">Reports Management</h2>
          </div>
        </div>
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
        </div>
      </motion.div>
    </div>
  );
}

export default AdminPage;
