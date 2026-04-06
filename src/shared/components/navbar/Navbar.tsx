import { useNavigate } from "react-router-dom";

interface User {
  name?: string;
  userId?: string;
}

export default function Navbar() {
  const navigate = useNavigate();

  // Get user data safely from localStorage
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
          BOOK<span className="text-[#F84464]">MY</span>SHOW
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Welcome,</span>
            <span className="text-sm font-semibold text-white">
              {user?.name || "Guest User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white/5 hover:bg-[#F84464] border border-white/10 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
}
