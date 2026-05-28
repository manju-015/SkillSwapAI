import {
  LayoutDashboard,
  Users,
  User,
  CalendarDays,
  Brain,
  Bell,
  MessageCircle,
  BarChart3,
  Shield,
  LogOut,
  Menu,
  X,
  BrainCircuit,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";

import { useState, useEffect } from "react";

import api from "../api/api";

function Navbar() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [requests, setRequests] = useState([]);

  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  const unreadCount = notifications.filter((n) => !n.read).length;

  const unreadRequests = requests.filter(
    (r) => r.status === "pending" && r.seen !== true,
  ).length;
  console.log("UNREAD:", unreadRequests);

  const links = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },

    {
      title: "Users",
      path: "/users",
      icon: <Users size={18} />,
    },

    {
      title: "Requests",
      path: "/requests",
      icon: (
        <div className="relative">
          <MessageCircle size={18} />

          {unreadRequests > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {unreadRequests}
            </span>
          )}
        </div>
      ),
    },

    {
      title: "Connections",
      path: "/connections",
      icon: <Users size={18} />,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: <User size={18} />,
    },

    {
      title: "AI Planner",
      path: "/study-plan",
      icon: <Brain size={18} />,
    },

    {
      title: "Sessions",
      path: "/sessions",
      icon: <CalendarDays size={18} />,
    },

    ...(userInfo?.isAdmin
      ? [
          {
            title: "Analytics",

            path: "/analytics",
            icon: <BarChart3 size={18} />,
          },
          {
            title: "Admin",
            path: "/admin",
            icon: <Shield size={18} />,
          },
        ]
      : []),

    {
      title: "Notifications",
      path: "/notifications",
      icon: (
        <div className="relative">
          <Bell size={18} />

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </div>
      ),
    },
  ];

  const logoutHandler = () => {
    dispatch(logout());

    localStorage.removeItem("userInfo");
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get("/notifications");

      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data } = await api.get("/matches/received");

      console.log("REQUESTS:", data);

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      fetchNotifications();
      fetchRequests();
    }
  }, [userInfo]);

  if (hideNavbar) return null;

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-7 h-7 text-blue-400" />

          <h1 className="text-xl font-semibold text-white">SkillSwap AI</h1>
        </div>

        <button onClick={() => setOpen(!open)} className="text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-slate-900/90 border-r border-slate-800 z-40 transform transition-transform duration-300 flex flex-col backdrop-blur-xl ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-9 h-9 text-blue-400" />

            <div>
              <h1 className="text-2xl font-semibold text-white">SkillSwap</h1>

              <p className="text-sm text-slate-400 mt-1">Learning Platform</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
          {links.map((link) => {
            const active = location.pathname === link.path;

            return (
              <Link
                key={link.title}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium ${
                  active
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.icon}

                <span>{link.title}</span>
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition text-sm font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
