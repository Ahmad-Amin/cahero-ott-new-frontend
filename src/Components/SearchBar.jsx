import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineAdjustments } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Divider } from "@mui/material";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../ui/LoadingWrapper";

const SearchBar = ({ showAdjustments = true }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [placeholderText, setPlaceholderText] = useState("Search...");
  const debounceTimeout = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/webinar")) {
      setPlaceholderText("Search Webinars...");
    } else if (location.pathname.startsWith("/books")) {
      setPlaceholderText("Search Books...");
    } else if (location.pathname.startsWith("/documentaries")) {
      setPlaceholderText("Search Documentaries...");
    } else {
      setPlaceholderText("Search...");
    }
  }, [location.pathname]);

 
  const fetchSearchResults = async (query) => {
    let endpoint = "";
    if (location.pathname.startsWith("/webinar")) {
      endpoint = `/webinars?search=${query}`;
    } else if (location.pathname.startsWith("/books")) {
      endpoint = `/books?search=${query}`;
    } else if (location.pathname.startsWith("/documentaries")) {
      endpoint = `/lectures?search=${query}`;
    }

    if (endpoint) {
      try {
        setLoading(true);
        const response = await axiosInstance.get(endpoint);
        setSearchResults(response.data || []);
      } catch (error) {
        console.log("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query.trim()) {
        fetchSearchResults(query);
      } else {
        setSearchResults([]);
      }
    }, 1000);
  };

  
  

  return (
    <div className="relative w-full items-center px-4 sm:px-0">
      <div className="flex items-center justify-center w-full sm:w-96 h-14 bg-transparent text-white font-bold text-xl">
        <div className="w-full sm:w-3/4 h-12 bg-transparent rounded-3xl flex items-center justify-center text-black font-normal text-lg border border-white transition-all duration-300 ease-in-out">
          <FiSearch className="mx-2 text-xl sm:text-3xl text-white" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholderText}
            className="w-full h-full px-1 bg-transparent outline-none text-white font-normal text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
