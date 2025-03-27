import React from "react";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, Link } from "react-router-dom";

const navLinks = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 2,
    name: "Courses",
    url: "/courses",
  },
  {
    id: 3,
    name: "Schedule",
    url: "/schedule",
  },
  {
    id: 4,
    name: "Messages",
    url: "/messages",
  },
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">SkillsBridge</h1>
          <div className="hidden space-x-4">
            {location.pathname.includes("/dashboard") &&
              navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.url}
                  className={`px-3 py-2 rounded hover:bg-gray-700 ${
                    location.pathname === link.url ? "bg-gray-700" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-1">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {location.pathname.includes("/dashboard") && (
            <Link
              to="/dashboard/settings"
              className="px-3 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
            >
              <Settings size={20} />
              <span className="">Settings</span>
            </Link>
          )}
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-gray-600">AS</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline font-medium">Alex Smith</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
