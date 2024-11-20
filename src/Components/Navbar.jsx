import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Modal, Box } from "@mui/material";
import SignInForm from "../Components/SignInForm";
import SignUpForm from "../Components/SignUpForm";
import { logout } from "../Slice/AuthSlice";
import { NavLink, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "700px",
  boxShadow: 24,
  background: "#0d0d0d",
  borderRadius: "16px",
  padding: "20px",
};

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const profileDropdownRef = useRef(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation(); // To determine the active tab
  const currentUser = useSelector((state) => state.auth.user); // Get the current user from Redux state


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notifications");
        const filteredNotifications = response.data.results.filter((notification) =>
          (currentUser.role === "admin" && (notification.recipientType === "Admins" || notification.recipientType === "All")) ||
          (currentUser.role === "user" && (notification.recipientType === "Users" || notification.recipientType === "All"))
        )
        const latestNotifications = filteredNotifications.slice(0, 5); 
        setNotifications(latestNotifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
  
    fetchNotifications();
  }, []);

  const toggleSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const toggleSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const closeModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const handleSignOut = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-8">
  {/* Logo */}
  <div className="flex items-center space-x-2">
    <img
      src={`${process.env.PUBLIC_URL}/Images/Cahero Legacy.png`}
      alt="Cahero Legacy"
      className="h-16"
    />
  </div>

  {/* Navigation Links */}
  <ul className="flex space-x-6">
    <li>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-medium ${isActive ? "text-white" : "text-gray-400"} hover:text-white`
        }
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/popular"
        className={({ isActive }) =>
          `font-medium ${isActive ? "text-white" : "text-gray-400"} hover:text-white`
        }
      >
        Popular
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/webinars"
        className={() =>
          `font-medium ${
            location.pathname.includes("/webinars") ? "text-white" : "text-gray-400"
          } hover:text-white`
        }
      >
        Webinars
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/books"
        className={() =>
          `font-medium ${
            location.pathname.includes("/books") ? "text-white" : "text-gray-400"
          } hover:text-white`
        }
      >
        Books
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/documentaries"
        className={() =>
          `font-medium ${
            location.pathname.includes("/documentaries") ? "text-white" : "text-gray-400"
          } hover:text-white`
        }
      >
        Documentaries
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/community"
        className={() =>
          `font-medium ${
            location.pathname.includes("/community") ? "text-white" : "text-gray-400"
          } hover:text-white`
        }
      >
        Community
      </NavLink>
    </li>
  </ul>
</div>


        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div ref={dropdownRef}>
                <button onClick={toggleDropdown} className="p-2 bg-[#1b1a1a] hover:bg-[#413e3e] ease-in-out transition duration-300 rounded-lg">
                  <NotificationsNoneIcon />
                </button>
                {isDropdownOpen && (
            <div className="absolute right-56 top-full mt-3 bg-[#0d0d0d] text-white rounded-md shadow-lg z-30">
              <div className="text-center py-2 font-bold border-b border-gray-600">Notifications</div>
              {Array.isArray(notifications) && notifications.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <li key={index} className="flex items-center h-20 px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">
                      <div className="flex flex-col justify-center flex-grow overflow-hidden">
                        <div className="font-semibold">{notification.notificationType}</div>
                        <div className="text-sm w-96 text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1">{notification.content}</div>
                      </div>
                      <span className="ml-4 text-xs text-gray-400" style={{ width: "100px", textAlign: "center" }}>
                        {notification.time}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-2 px-4 font-semibold text-lg text-white opacity-70">No notifications available</div>
              )}
              <Link to="/notifications">
                <button className="flex justify-end w-full my-3 px-3 text-sm hover:font-semibold ease-in-out transition duration-300">
                  View All
                </button>
              </Link>
            </div>
          )}
              </div>
              <div
                className="flex items-center space-x-2"
                ref={profileDropdownRef}
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {currentUser?.firstName?.[0].toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={toggleProfileDropdown}
                  className=" text-gray-400 hover:text-white font-medium ease-in-out transition duration-300"
                >
                  {currentUser.firstName}
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-10 top-16 mt-3 text-white rounded-md shadow-lg z-30 bg-[#0d0d0d]">
                    <div className="px-4 py-3 text-sm border-b-2">
                      <div className="text-base font-bold">
                        {currentUser.firstName}
                      </div>
                      <div className="font-medium truncate opacity-60">
                        {currentUser.email}
                      </div>
                    </div>
                    <ul className="py-2 text-sm space-y-2">
                      <li>
                        <Link
                          to="/"
                          className="block px-4 mx-2 py-2 rounded-lg hover:bg-[#5242b6] cursor-pointer ease-in-out transition items-center"
                        >
                          <DashboardOutlinedIcon className="mr-2" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/notifications"
                          className="block px-4 mx-2 py-2 rounded-lg hover:bg-[#5242b6] cursor-pointer ease-in-out transition"
                        >
                          <NotificationsNoneOutlinedIcon className="mr-2" />
                          Notifications
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/favourites"
                          className="block px-4 mx-2 py-2 rounded-lg hover:bg-[#5242b6] cursor-pointer ease-in-out transition"
                        >
                          <FavoriteBorderOutlinedIcon className="mr-2" />
                          Favourites
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile-settings"
                          className="block px-4 mx-2 py-2 rounded-lg hover:bg-[#5242b6] cursor-pointer ease-in-out transition"
                        >
                          <SettingsOutlinedIcon className="mr-2" />
                          Settings
                        </Link>
                      </li>
                      {userData.role === "admin" && (
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-4 mx-2 py-2 rounded-lg hover:bg-[#5242b6] cursor-pointer ease-in-out transition"
                          >
                            <AdminPanelSettingsOutlinedIcon className="mr-2" />
                            Admin Panel
                          </Link>
                        </li>
                      )}
                    </ul>
                    <div className="py-2" onClick={handleSignOut}>
                      <Link
                        to="/"
                        className="block px-4 py-2 mx-2 rounded-lg text-sm text-white hover:bg-red-700 cursor-pointer ease-in-out transition"
                      >
                        <LogoutOutlinedIcon className="mr-2" />
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Sign In and Sign Up */}
              <button
                onClick={toggleSignIn}
                className="text-white hover:font-semibold hover:scale-[1.05] ease-in-out transition duration-300 mr-3"
              >
                Sign In
              </button>
              <button
                onClick={toggleSignUp}
                className="text-white hover:font-semibold hover:scale-[1.05] ease-in-out transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <div>
        <Modal
          open={showSignIn}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SignInForm onClose={closeModal} toggleSignUp={toggleSignUp} />
          </Box>
        </Modal>

        <Modal
          open={showSignUp}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SignUpForm onClose={closeModal} toggleSignIn={toggleSignIn} />
          </Box>
        </Modal>
      </div>
    </nav>
  );
}

export default Navbar;
