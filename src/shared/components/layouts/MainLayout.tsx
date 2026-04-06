import { Outlet, Navigate } from "react-router-dom";
import { Navbar } from "../navbar";

export default function MainLayout() {
  const isLoggedIn = !!localStorage.getItem("user");

  // Auth Guard: If not logged in, boot them to login page
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
