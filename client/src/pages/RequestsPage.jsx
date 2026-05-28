import { useEffect, useState } from "react";

import api from "../api/api";

import toast from "react-hot-toast";

import { Inbox, CheckCircle2, XCircle, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

function RequestsPage() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const { data } = await api.get("/matches/received");

      setRequests(data);
    } catch (error) {
      toast.error("Failed to load requests");
    }
  };

  const handleRequest = async (requestId, status) => {
    try {
      await api.put("/matches/respond", {
        matchId: requestId,
        status,
      });

      toast.success(`Request ${status}`);

      fetchRequests();
    } catch (error) {
      toast.error("Action failed");
    }
  };

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

  const markSeen = async () => {
    try {
      await api.put("/matches/seen");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
    markSeen();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500 mb-2">Collaboration</p>

        <h1 className="text-3xl font-semibold text-white-800">
          Match Requests
        </h1>

        <p className="text-slate-500 mt-3">
          Manage mentorship and collaboration requests.
        </p>
      </div>

      {/* EMPTY */}
      {requests.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            No Requests Yet
          </h2>

          <p className="text-slate-500">Incoming requests will appear here.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {requests.map((request, index) => (
            <motion.div
              key={request._id}
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
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg font-semibold shrink-0">
                  {request.sender?.name?.charAt(0)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        {request.sender?.name}
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {request.sender?.email}
                      </p>
                    </div>

                    <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap">
                      {request.sender?.level || "Beginner"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mt-4">
                    {request.sender?.bio || "No bio available."}
                  </p>
                </div>
              </div>

              {/* SKILLS */}
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">
                  Skills Offered
                </p>

                <div className="flex flex-wrap gap-2">
                  {request.sender?.skillsOffered?.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => handleRequest(request._id, "accepted")}
                  className="bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Accept
                </button>

                <button
                  onClick={() => handleRequest(request._id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2"
                >
                  <XCircle size={16} />
                  Reject
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestsPage;
