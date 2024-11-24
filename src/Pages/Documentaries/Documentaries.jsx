import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../lib/axiosInstance";
import MediaCard from "../../Components/MediaCard";
import LoadingWrapper from "../../ui/LoadingWrapper";

const Documentaries = () => {
  const [documentaries, setDocumentaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced value
  const [placeholderText, setPlaceholderText] = useState("Search Documentaries...");
  const debounceTimeout = useRef(null);

  const tabs = ["All", "Science", "History", "Nature", "Technology"]; // Example tabs

  const fetchDocumentaries = async (url) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(url);
      setDocumentaries(response.data);
    } catch (error) {
      console.error("Error fetching documentaries:", error);
      setDocumentaries([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch documentaries based on active tab or search query
  useEffect(() => {
    if (debouncedSearch) {
      fetchDocumentaries(`/lectures?search=${debouncedSearch}`);
    } else {
      const endpoint =
        activeTab === "All"
          ? "/lectures"
          : `/lectures?category=${activeTab.toLowerCase()}`;
      fetchDocumentaries(endpoint);
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
    <div className="mt-28 ml-8 mb-5">
      {/* Header Section */}
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="text-3xl text-white font-semibold">
            {debouncedSearch ? "Search Results" : `${activeTab} Documentaries`}
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
              setActiveTab(tab); // Set the active tab
              setSearchQuery(""); // Reset search query when switching tabs
              setDebouncedSearch(""); // Reset debounced value as well
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Documentaries Section */}
      <LoadingWrapper loading={loading}>
        <div className="grid grid-cols-3 gap-6 mt-6 mr-7">
          {documentaries.length > 0 ? (
            documentaries.map((media) => (
              <MediaCard
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
                data={media.startDate}
                category={media.category}
                cardheight={"300px"}
                height={"400px"}
                axiosUrl={"/lectures"}
              />
            ))
          ) : (
            <p className="text-white text-center col-span-3">
              {debouncedSearch
                ? "No search results found."
                : "Documentaries not available"}
            </p>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default Documentaries;
