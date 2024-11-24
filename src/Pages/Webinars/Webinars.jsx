import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../lib/axiosInstance";
import WebinarCard from "../../Components/WebinarCard";
import LoadingWrapper from "../../ui/LoadingWrapper";

const Webinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced value
  const [placeholderText, setPlaceholderText] = useState("Search Webinars...");
  const debounceTimeout = useRef(null);

  const tabs = ["All", "Finance", "Business", "Technology"];

  const fetchWebinars = async (url) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setWebinars(response.data);
    } catch (error) {
      console.error("Error fetching webinars:", error);
      setWebinars([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch webinars based on the debounced search query or active tab
  useEffect(() => {
    if (debouncedSearch) {
      fetchWebinars(`/webinars?search=${debouncedSearch}`);
    } else {
      const endpoint =
        activeTab === "All"
          ? "/webinars"
          : `/webinars?target=${activeTab.toLowerCase()}`;
      fetchWebinars(endpoint);
    }
  }, [activeTab, debouncedSearch]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout for 1 second
    debounceTimeout.current = setTimeout(() => {
      setDebouncedSearch(query); // Update the debounced value
    }, 1000);
  };

  return (
    <div className="mt-28 ml-8">
      {/* Header Section */}
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="text-3xl text-white font-semibold">
            {debouncedSearch ? "Search Results" : `${activeTab} Webinars`}
          </p>
        </div>
        <div className="w-full sm:w-96 h-14 bg-transparent text-white font-bold text-xl flex justify-end mr-5">
          <div className="w-full sm:w-3/4 h-12 bg-transparent rounded-3xl flex items-center text-black font-normal text-lg border border-white transition-all duration-300 ease-in-out">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={placeholderText}
              className="w-full h-full px-4 bg-transparent outline-none text-white font-normal text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-2 py-1 rounded-2xl ${
              activeTab === tab
                ? "bg-[#6449cc] text-white"
                : "bg-transparent text-white hover:bg-[#6449cc] border border-white"
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSearchQuery(""); // Reset search query when switching tabs
              setDebouncedSearch(""); // Reset debounced value as well
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Webinars Section */}
      <LoadingWrapper loading={loading}>
        <div className="grid grid-cols-3 gap-6 mt-6 mr-7">
          {webinars.length > 0 ? (
            webinars.map((media) => (
              <WebinarCard
                key={media.id}
                id={media.id}
                title={media.title}
                thumbnail={media.coverImageUrl}
                recentlyAdded={media.recentlyAdded}
                duration={media.duration}
                ageRating={media.ageRating}
                tags={media.tags}
                type={media.type}
                author={media.author}
                date={media.startDate}
                cardheight={"300px"}
                height={"400px"}
                axiosUrl={"/webinars"}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-3">
              {debouncedSearch ? "No search results found." : "Webinars not available"}
            </p>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default Webinars;
