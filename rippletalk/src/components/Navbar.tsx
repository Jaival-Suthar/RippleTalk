import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
// Import icons -- choose appropriate icons from react-icons
import { FaLeaf, FaHome, FaPlusCircle, FaChartLine, FaTrophy, FaWater, FaMedkit } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "New Entry", path: "/new", icon: <FaPlusCircle /> },
  { name: "Ripples", path: "/ripples", icon: <FaWater /> },
  { name: "Meditate", path: "/meditate", icon: <FaMedkit /> },
  { name: "Progress", path: "/progress", icon: <FaChartLine /> },
  { name: "Achievements", path: "/achievements", icon: <FaTrophy /> },
  //{ name: "Profile", path: "/profile", icon: <FaUser /> },  // Added Profile nav item
];

export const Navbar = () => {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <nav className="flex items-center px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* RT Logo left */}
      <div className="flex items-center mr-8">
        <FaLeaf className="text-green-400 w-7 h-7" />
        <span className="ml-2 font-bold text-lg">RT</span>
      </div>

      {/* Nav items centered */}
      <div className="flex flex-grow justify-center gap-8">
        {navItems.map(({ name, path, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-2 transition-colors text-sm sm:text-base ${
              location.pathname === path ? "text-green-400 font-semibold" : "text-white hover:text-green-300"
            }`}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '1.2em' }}>{icon}</span>
            <span>{name}</span>
          </Link>
        ))}
      </div>

      {/* Logout right */}
      <button
        onClick={logout}
        className="ml-auto bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
      >
        Logout
      </button>
    </nav>
  );
};

