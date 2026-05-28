import { useSelector } from "react-redux";

import {
  Users,
  Brain,
  CalendarDays,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

function DashboardPage() {
  const { userInfo } = useSelector((state) => state.auth);

  const stats = [
    {
      title: "Connections",
      value: "24",
      icon: <Users size={18} />,
    },

    {
      title: "Sessions",
      value: "18",
      icon: <CalendarDays size={18} />,
    },

    {
      title: "Messages",
      value: "132",
      icon: <MessageCircle size={18} />,
    },

    {
      title: "Growth",
      value: "+82%",
      icon: <TrendingUp size={18} />,
    },
  ];

  const quickActions = [
    {
      title: "Discover Users",
      path: "/users",
    },

    {
      title: "AI Study Planner",
      path: "/study-plan",
    },

    {
      title: "View Sessions",
      path: "/sessions",
    },
  ];

  return (
    <div className="space-y-6 pt-16 lg:pt-0">
      {/* HERO */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white/[0.07] border border-white/[0.08] rounded-[30px] p-6 lg:p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-5">
              <Sparkles size={16} className="text-blue-400" />

              <span className="text-sm text-blue-300">
                AI Powered Dashboard
              </span>
            </div>

            <p className="text-sm text-slate-400 mb-2">Welcome back</p>

            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {userInfo?.name}
            </h1>

            <p className="text-sm text-slate-400 mt-5 max-w-2xl leading-8">
              Continue your learning journey, connect with mentors, and improve
              your skills with AI powered guidance.
            </p>
          </div>

          {/* PROFILE */}
          <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 min-w-[280px]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
                {userInfo?.name?.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-white">{userInfo?.name}</h3>

                <p className="text-sm text-slate-400">{userInfo?.email}</p>
              </div>
            </div>

            <div className="mt-5">
              <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium">
                {userInfo?.level}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
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
            >
              <Link
                to={action.path}
                className="bg-white/[0.07] border border-white/[0.08] rounded-3xl p-5 backdrop-blur-xl hover:border-blue-500/30 hover:-translate-y-1 transition block"
              >
                <h3 className="font-semibold text-white">{action.title}</h3>

                <p className="text-sm text-slate-400 mt-2">Open page</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI INSIGHTS */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="bg-white/[0.07] border border-white/[0.08] rounded-[30px] p-6 lg:p-8 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Brain size={18} />
          </div>

          <h2 className="text-2xl font-semibold text-white">AI Insights</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="bg-white/[0.07] border border-white/[0.08] rounded-3xl p-5">
            <h3 className="font-semibold text-white mb-3">Skill Growth</h3>

            <p className="text-sm text-slate-400 leading-relaxed">
              Your backend and DevOps progress has improved significantly this
              week.
            </p>
          </div>

          <div className="bg-white/[0.07] border border-white/[0.08] rounded-3xl p-5">
            <h3 className="font-semibold text-white mb-3">Mentorship Match</h3>

            <p className="text-sm text-slate-400 leading-relaxed">
              AI recommends connecting with advanced Node.js mentors.
            </p>
          </div>

          <div className="bg-white/[0.07] border border-white/[0.08] rounded-3xl p-5">
            <h3 className="font-semibold text-white mb-3">Weekly Target</h3>

            <p className="text-sm text-slate-400 leading-relaxed">
              Complete 3 mentoring sessions to maintain your growth rate.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardPage;
