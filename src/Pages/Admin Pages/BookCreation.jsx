import React, { useState, useRef, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import BookCardGrid from "../../Components/Admin Components/BookCard";
import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustments } from "react-icons/hi";

const drawerWidth = 70;

const BookCreation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedDateFilter, setSelectedDateFilter] = useState(""); // Track selected filter value
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000); 

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDropdownSelect = (value) => {
    setSelectedDateFilter(value); // Update selected filter value
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#101011",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="p-5">
          <div className="flex flex-row items-center gap-6">
            <h1 className="flex-1 text-3xl font-semibold text-white py-8">
              Book Management
            </h1>
            <div className="flex items-center justify-center h-14 bg-transparent text-white font-bold text-xl">
              <div className="w-full h-12 bg-transparent rounded-3xl flex items-center justify-center text-black font-normal text-lg border border-white transition-all duration-300 ease-in-out">
                <FiSearch className="mx-2 text-xl sm:text-3xl text-white" />
                <input
                  type="text"
                  placeholder="Search Books..."
                  className="w-full h-full px-1 bg-transparent outline-none text-white font-normal text-sm sm:text-base"
                  onChange={handleSearchChange}
                />
                <div className="relative">
                  <HiOutlineAdjustments
                    className="mx-2 text-xl sm:text-3xl text-white cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      id="dropdown"
                      className="absolute right-0 mt-5 mr-2 bg-[#404041] w-auto h-auto text-[#d0d0d0] rounded-lg shadow-lg flex flex-col z-10"
                    >
                      <div>
                        {[
                          { label: "None", value: "" },
                          { label: "Today", value: "today" },
                          { label: "This Week", value: "this_week" },
                          { label: "This Month", value: "this_month" },
                        ].map((option, index) => (
                          <div key={option.value}>
                            <div
                              className="flex items-center justify-start px-10 w-56 h-12"
                              onClick={() => handleDropdownSelect(option.value)} 
                            >
                              <label className="flex items-center w-full h-full cursor-pointer">
                                <input
                                  type="radio"
                                  name="dateOption"
                                  className="appearance-none w-5 h-5 border-2 border-white rounded-full cursor-pointer checked:bg-white checked:border-transparent"
                                  checked={selectedDateFilter === option.value}
                                  readOnly
                                />
                                <span className="ml-3">{option.label}</span>
                              </label>
                            </div>
                            {index < 2 && <Divider className="bg-[#393e40]" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Link to="/dashboard/book-creation/create-new-book">
              <button className="w-44 h-12 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
                Create New
              </button>
            </Link>
          </div>
          <p className="font-normal text-base text-white opacity-60">Manage or Add new book</p>
        </div>
        <div>
          <BookCardGrid searchQuery={debouncedQuery} dateFilter={selectedDateFilter} />
        </div>
      </Box>
    </>
  );
};

export default BookCreation;
