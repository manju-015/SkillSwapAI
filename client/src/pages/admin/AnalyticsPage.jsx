import { useEffect, useState } from "react";

import api from "../../api/api";

import toast from "react-hot-toast";

import { BarChart3, TrendingUp, Users, CalendarDays } from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { motion } from "framer-motion";

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/admin/analytics");

      setAnalytics(data);
    } catch (error) {
      toast.error("Failed to load analytics");
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const chartData = [
    {
      name: "Mon",
      users: 20,
    },

    {
      name: "Tue",
      users: 35,
    },

    {
      name: "Wed",
      users: 28,
    },

    {
      name: "Thu",
      users: 50,
    },

    {
      name: "Fri",
      users: 42,
    },

    {
      name: "Sat",
      users: 65,
    },

    {
      name: "Sun",
      users: 58,
    },
  ];

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
      title: "Growth",
      value: "+18%",
      icon: <TrendingUp size={18} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <p className="text-sm text-slate-500 mb-2">Reports</p>

        <h1 className="text-3xl font-semibold text-slate-800">Analytics</h1>

        <p className="text-slate-500 mt-3">
          Track platform growth and user engagement.
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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
              delay: index * 0.04,
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

      {/* CHART */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BarChart3 size={20} />
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Weekly Growth
          </h2>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* INSIGHTS */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">User Growth</h3>

          <p className="text-sm text-slate-500 leading-relaxed">
            Platform engagement is steadily increasing with more mentorship
            requests each week.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">AI Performance</h3>

          <p className="text-sm text-slate-500 leading-relaxed">
            AI recommendations are helping users discover better learning
            matches.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-3">Sessions Trend</h3>

          <p className="text-sm text-slate-500 leading-relaxed">
            Mentorship session bookings are increasing consistently across the
            platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
