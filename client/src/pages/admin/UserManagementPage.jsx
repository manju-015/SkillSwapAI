import React, { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { CalendarDays, Shield, TrendingUp, Users } from "lucide-react";

function UserManagementPage() {
  const { analytics, setAnalytics } = useState(null);

  const [users, setUsers] = useState([]);

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => !user.isBlocked).length;

  const blockedUsers = users.filter((user) => user.isBlocked).length;

  const adminUsers = users.filter((user) => user.isAdmin).length;

  const [search, setSearch] = useState("");

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
      value: totalUsers,
      icon: <Users size={18} />,
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <Shield size={18} />,
    },
    {
      title: "Blocked Users",
      value: blockedUsers,
      icon: <TrendingUp size={18} />,
    },
    {
      title: "Admins",
      value: adminUsers,
      icon: <CalendarDays size={18} />,
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mt-0 p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* USERS MANAGEMENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Users Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage platform users and moderation.
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
        </div>
        <div className="relative w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-4 text-sm font-semibold text-slate-600">
                  User
                </th>

                <th className="pb-4 text-sm font-semibold text-slate-600">
                  Level
                </th>

                <th className="pb-4 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="pb-4 text-sm font-semibold text-slate-600">
                  Role
                </th>

                <th className="pb-4 text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-100 hover:bg-slate-50 transition"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {user.name?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {user.name}
                        </h3>

                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 text-sm text-slate-600">
                    {user.level || "Beginner"}
                  </td>

                  <td className="py-5">
                    {user.isBlocked ? (
                      <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                        Blocked
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="py-5">
                    {user.isAdmin ? (
                      <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                        Admin
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full font-medium">
                        User
                      </span>
                    )}
                  </td>

                  <td className="py-5">
                    {!user.isAdmin ? (
                      <div className="flex items-center gap-3">
                        {user.isBlocked ? (
                          <button
                            onClick={() => unblockUserHandler(user._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => blockUserHandler(user._id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl text-sm"
                          >
                            Block
                          </button>
                        )}

                        <button
                          onClick={() => deleteUserHandler(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400 font-medium">
                        Protected Admin
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

export default UserManagementPage;
