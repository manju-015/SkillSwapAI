import {
  Brain,
  Users,
  Sparkles,
  MessageCircle,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { BrainCircuit } from "lucide-react";

function HomePage() {
  const features = [
    {
      icon: <Users size={32} />,
      title: "Skill Matching",
      description:
        "Connect with developers, mentors, and learners based on skills and interests.",
    },

    {
      icon: <Brain size={32} />,
      title: "AI Study Planner",
      description:
        "Generate personalized AI-powered learning roadmaps instantly.",
    },

    {
      icon: <MessageCircle size={32} />,
      title: "Real-Time Chat",
      description:
        "Collaborate and communicate instantly using live messaging.",
    },

    {
      icon: <CalendarDays size={32} />,
      title: "Mentor Sessions",
      description:
        "Book mentoring sessions and accelerate your learning journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="flex items-center gap-3 justify-center mt-10 mb-1">
        <BrainCircuit className="w-10 h-10 text-white" />

        <h1 className="text-4xl font-bold tracking-tight">SkillSwap AI</h1>
      </div>

      {/* HERO */}
      <section className="relative px-6 lg:px-20 pt-16 pb-24">
        <div className="top-0 left-0 w-full bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-purple-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-5 py-3 rounded-full mb-4">
              <Sparkles size={20} />

              <span>AI-Powered Learning Platform</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight">
              Learn.
              <br />
              Connect.
              <br />
              Grow Faster.
            </h1>

            <p className="text-slate-400 text-base mt-6 leading-7">
              SkillSwap AI helps developers and learners connect, collaborate,
              and grow using AI-driven mentorship and learning systems.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3.5 rounded-xl font-medium text-sm"
              >
                Get Started
                <ArrowRight size={22} />
              </Link>

              <Link
                to="/login"
                className="border border-slate-700 hover:border-slate-500 transition px-6 py-3.5 rounded-xl font-medium text-sm"
              >
                Login
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative"
          >
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="grid gap-5">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6">
                  <h2 className="text-2xl font-bold mb-3">AI Study Planner</h2>

                  <p className="text-blue-100">
                    Personalized learning paths for developers and creators.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-slate-800 rounded-3xl p-6">
                    <Users size={34} />

                    <h3 className="text-lg font-semibold mb-3">10K+</h3>

                    <p className="text-slate-400 mt-1">Active Learners</p>
                  </div>

                  <div className="bg-slate-800 rounded-3xl p-6">
                    <Brain size={34} />

                    <h3 className="text-xl font-bold mt-4">AI Powered</h3>

                    <p className="text-slate-400 mt-1">Smart Mentorship</p>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Real-Time Collaboration
                  </h3>

                  <p className="text-slate-400">
                    Connect instantly with mentors, peers, and learning
                    partners.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 lg:px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3">
            <h2 className="text-4xl font-bold mb-6">
              Everything You Need To Grow
            </h2>

            <p className="text-slate-400 text-base max-w-2xl mx-auto leading-7">
              SkillSwap AI combines mentorship, networking, AI learning, and
              collaboration into one powerful platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-4 hover:border-blue-500/40 transition"
              >
                <div className="bg-blue-500/10 text-blue-400 p-3 rounded-2xl w-fit mb-6">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>

                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-6 pb-6">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-[28px] p-6 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-3">
            Start Your Learning Journey Today
          </h2>

          <p className="text-base mb-0">
            Join developers, creators, and learners building skills together
            using AI-powered mentorship.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-3 bg-white text-black px-4 py-1 rounded-2xl font-bold text-lg mt-3 hover:scale-105 transition"
          >
            Join SkillSwap AI
            <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
