import { useSelector } from "react-redux";

function Layout({ children }) {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-3xl pointer-events-none" />

      <main className="relative lg:ml-[260px] min-h-screen px-4 lg:px-8 py-6">
        <div className="max-w-[1600px] mx-auto">
          {/* STICKY HEADER */}

          <div className="sticky top-0 z-30 mb-6 pt-4">
            <div className="bg-white/10 border border-white/[0.08] backdrop-blur-2xl rounded-3xl px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  SkillSwap AI
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  AI Powered Learning Platform
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-white">
                    {userInfo?.name}
                  </p>

                  <p className="text-xs text-slate-400">{userInfo?.email}</p>
                </div>

                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                  {userInfo?.name?.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          {/* PAGE CONTENT */}
          <div className="space-y-6 pt-20 lg:pt-4">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
