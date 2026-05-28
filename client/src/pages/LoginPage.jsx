import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { setCredentials } from "../redux/slices/authSlice";

import api from "../api/api";

import toast from "react-hot-toast";

import { BrainCircuit, ArrowRight, Sparkles, LogIn } from "lucide-react";

import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      dispatch(setCredentials(data));

      localStorage.setItem("userInfo", JSON.stringify(data));

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex items-center justify-center px-1 py-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative w-full max-w-5xl grid lg:grid-cols-2 bg-slate-900/80 border border-slate-800 rounded-[30px] overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-500 via-indigo-600">
          <div>
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-10 h-10 text-white" />

              <h1 className="text-4xl font-bold tracking-tight">
                SkillSwap AI
              </h1>
            </div>

            <div className="mt-20">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-3">
                <Sparkles size={18} />

                <span className="text-sm">AI-Powered Learning Platform</span>
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Welcome Back.
                <br />
                Continue Learning.
                <br />
                Keep Growing.
              </h2>

              <p className="text-blue-100 text-sm mt-8 leading-8 max-w-md">
                Access your mentorship sessions, AI-powered learning tools, and
                developer community all in one place.
              </p>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-lg">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-white" size={24} />

              <h3 className="text-2xl font-semibold">Learn + Collaborate</h3>
            </div>

            <p className="text-blue-100 leading-relaxed">
              Stay connected with mentors, learners, and AI-powered guidance to
              accelerate your growth.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-500/10 text-blue-400 p-4 rounded-2xl">
                <LogIn size={30} />
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Login Account
                </h2>

                <p className="text-slate-400 mt-2">
                  Continue your learning journey.
                </p>
              </div>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 hover:opacity-90 transition py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 mt-6"
              >
                {loading ? "Signing In..." : "Login"}

                <ArrowRight size={20} />
              </button>
            </form>

            <p className="text-center text-slate-400 mt-8">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
