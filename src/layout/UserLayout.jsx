import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

const UserLayout = ({ children }) => {
  const location = useLocation();

  // Check if the current path matches "/documentaries/details/:id"
  const hideNavbar = location.pathname.startsWith("/documentaries/details/");

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && (
        <div className="fixed z-50 w-full">
          <Navbar />
        </div>
      )}
      <main className="flex-grow">{children}</main>

      {/* Footer
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 Cahero Legacy. All rights reserved.
      </footer> */}
    </div>
  );
};

export default UserLayout;
