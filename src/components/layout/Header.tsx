import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 sticky top-0 left-0 right-0 z-10 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
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
        <div
          className={`items-center gap-4 ${
            location.pathname.includes("/dashboard") ? "flex" : "hidden"
          }`}
        >
          <button className="relative p-1">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Button variant="outline"> */}
              <Button
                variant={"ghost"}
                className="flex items-center gap-2 hover:bg-gray-700 hover:text-white"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.picture} alt="User" />
                  <AvatarFallback className="bg-gray-600">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "UN"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline font-medium">
                  {user?.name || "User Name"}
                </span>
                {/* </div> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
