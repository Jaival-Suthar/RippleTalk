import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const navItems = [
  { name: "Home", path: "/" },
  { name: "+ New Entry", path: "/new" },
  { name: "Progress", path: "/progress" },
  { name: "Achievements", path: "/achievements" },
];

export const Navbar = () => {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <nav className="flex items-center px-6 py-3 bg-gray-900 text-white shadow-md">
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`transition-colors text-sm sm:text-base ${
              location.pathname === item.path
                ? "text-green-400 font-semibold"
                : "text-white hover:text-green-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <button
        onClick={logout}
        className="ml-auto bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};
