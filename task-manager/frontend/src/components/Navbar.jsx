// src/components/Navbar.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Task Manager</h1>
      <div className="flex items-center space-x-4">
        <User className="w-6 h-6 text-gray-600" />
        <span className="font-medium text-gray-700">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded transition duration-200 ease-in-out hover:bg-red-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
