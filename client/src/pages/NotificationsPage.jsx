import { useEffect, useState } from "react";

import api from "../api/api";

import toast from "react-hot-toast";

import { Bell, CheckCircle2, Sparkles } from "lucide-react";

import { motion } from "framer-motion";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");

      setNotifications(data);
      const unreadNotifications = data.filter(
        (notification) => !notification.read,
      );

      if (unreadNotifications.length > 0) {
        await Promise.all(
          unreadNotifications.map((notification) =>
            api.put("/notifications/read", {
              notificationId: notification._id,
            }),
          ),
        );

        setNotifications((prev) =>
          prev.map((n) => ({
            ...n,
            read: true,
          })),
        );

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error("Failed to load notifications");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500 mb-2">Updates</p>

        <h1 className="text-3xl font-semibold text-white-800">Notifications</h1>

        <p className="text-slate-500 mt-3">
          Stay updated with mentorship requests, sessions, and platform
          activity.
        </p>
      </div>

      {/* EMPTY */}
      {notifications.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={28} />
          </div>

          <h2 className="text-2xl font-semibold text-white-800 mb-2">
            No Notifications
          </h2>

          <p className="text-slate-500">You're all caught up for now.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification._id}
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
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Bell size={18} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-semibold text-slate-800">
                      {notification.title || "Notification"}
                    </h2>

                    <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle2 size={14} />

                      {notification.read ? "Read" : "New"}
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {notification.message}
                  </p>

                  <p className="text-xs text-slate-400 mt-4">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;
