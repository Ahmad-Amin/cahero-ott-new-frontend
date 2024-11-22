import React from "react";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShieldIcon from "@mui/icons-material/Shield";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Link, useLocation } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // Replace 'auth.user' with your actual slice name
  const { firstName, lastName, email, profileImage } = user || {};
  const location = useLocation(); // Get the current route location

  // Generate initials if profileImage is not available
  const profileInitial =
    firstName && lastName ? `${firstName[0]}${lastName[0]}` : "U";

  const menuItems = [
    { id: "Account Settings", icon: <AccountCircleIcon />, label: "Account Settings", link: "/profile-settings" },
    { id: "Notifications", icon: <NotificationsIcon />, label: "Notifications", link: "/notifications" },
    { id: "Privacy", icon: <ShieldIcon />, label: "Privacy", link: "/privacy" },
    { id: "Support & Help", icon: <HelpOutlineIcon />, label: "Support & Help", link: "/help-support" },
  ];

  return (
    <div className="flex h-screen mt-20">
      {/* Sidebar */}
      <div className="w-64 bg-[#0e0e0e] text-white flex flex-col py-6 m-5 px-3 rounded-lg">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-auto h-auto bg-purple-500 flex items-center justify-center rounded-full text-lg font-bold overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>{profileInitial}</span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{`${firstName || "User"} ${
              lastName || ""
            }`}</h3>
            <p className="text-sm text-gray-400">{email || "user@example.com"}</p>
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-6">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-4 cursor-pointer hover:text-purple-500 ${
                location.pathname === item.link
                  ? "border-l-4 border-purple-500 bg-transparent font-bold"
                  : ""
              }`}
            >
              <Link to={item.link} className="pl-4 flex items-center gap-4 w-full">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
};

export default SidebarLayout;
