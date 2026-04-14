
import { useNavigate } from "react-router-dom";

interface User {
  name?: string;
  userId?: string;
}

export default function Navbar() {
  const navigate = useNavigate();

  const userJson = localStorage.getItem("user");
  const user: User | null = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0d1117]/80 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div
          className="text-2xl font-bold tracking-tighter cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <span className="text-[#F84464]">BOOK MY SHOW ?</span>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              {/* Text Info */}
              <div className="flex flex-col items-end border-r border-white/10 pr-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold leading-none">
                  Welcome
                </span>
                <span className="text-sm font-bold text-white mt-1">
                  {user.name}
                </span>
                <button
                  onClick={() => navigate("/booking/confirmation")}
                  className="mt-1 group"
                >
                  <span className="text-[11px] text-gray-400 group-hover:text-[#F84464] transition-colors flex items-center gap-1">
                    View Profile
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </span>
                </button>
              </div>

              {/* Logout Action */}
              <button
                onClick={handleLogout}
                className="bg-white/5 hover:bg-[#F84464]/10 border border-white/10 hover:border-[#F84464]/50 text-white text-[11px] font-black tracking-widest py-2 px-4 rounded-xl transition-all active:scale-95"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-[#F84464] text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-[#F84464]/20 hover:bg-[#e03a58] transition-all active:scale-95"
            >
              LOGIN
            </button>
          )}
        </div>


      </div>
    </nav>
  );
}
