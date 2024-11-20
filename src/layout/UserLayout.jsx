import React from "react";
import Navbar from "../Components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed z-50 w-full">
      <Navbar />
      </div>
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 Cahero Legacy. All rights reserved.
      </footer> */}
    </div>
  );
};

export default UserLayout;
