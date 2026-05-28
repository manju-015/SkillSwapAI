import { useEffect, useState } from "react";

import api from "../api/api";

import toast from "react-hot-toast";

import { Search, Users, Sparkles, Send } from "lucide-react";

import { motion } from "framer-motion";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");

      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sendRequest = async (userId) => {
    try {
      await api.post("/matches/send", {
        receiverId: userId,
      });

      toast.success("Request sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-sm text-slate-500 mb-2">Community</p>

          <h1 className="text-2xl font-semibold text-white-800">
            Discover People
          </h1>

          <p className="text-slate-500 mt-3">
            Connect with mentors, developers, and learners.
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm w-full lg:w-[380px]">
          <Search className="text-slate-400" size={18} />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            No Users Found
          </h2>

          <p className="text-slate-500">Try adjusting your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user._id}
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
                  {user.name?.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {user.name}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {user.email}
                      </p>
                    </div>

                    <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap">
                      {user.level || "Beginner"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mt-4">
                    {user.bio || "No bio added yet."}
                  </p>
                </div>
              </div>

              {/* SKILLS */}
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">
                  Skills Offered
                </p>

                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION */}
              <button
                onClick={() => sendRequest(user._id)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Request
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
