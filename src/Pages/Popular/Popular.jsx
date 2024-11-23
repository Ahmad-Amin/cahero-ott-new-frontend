import React, { useEffect, useState } from "react";
import MediaCard from "../../Components/MediaCard";
import axiosInstance from "../../lib/axiosInstance";
import { Link } from "react-router-dom";
import LoadingWrapper from "../../ui/LoadingWrapper";

const Popular = () => {
  const [webinarData, setWebinarData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [lectureData, setLectureData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Active tabs for each section
  const [activeWebinarTab, setActiveWebinarTab] = useState("All");
  const [activeBookTab, setActiveBookTab] = useState("All");
  const [activeLectureTab, setActiveLectureTab] = useState("All");

  // Separate tabs for each section
  const webinarTabs = ["All", "Finance", "Business", "Technology"];
  const bookTabs = ["All", "Fiction", "Non-Fiction", "Science"];
  const lectureTabs = ["All", "History", "Math", "Science"];

  // Fetch webinars
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        setLoading(true);
        const endpoint =
          activeWebinarTab === "All"
            ? "/webinars"
            : `/webinars?target=${activeWebinarTab.toLowerCase()}`;
        const response = await axiosInstance.get(endpoint);
        setWebinarData(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching webinars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWebinars();
  }, [activeWebinarTab]);

  // Fetch lectures
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const endpoint =
          activeLectureTab === "All"
            ? "/lectures"
            : `/lectures?category=${activeLectureTab.toLowerCase()}`;
        const response = await axiosInstance.get(endpoint);
        setLectureData(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching lectures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, [activeLectureTab]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const endpoint =
          activeBookTab === "All"
            ? "/books"
            : `/books?genre=${activeBookTab.toLowerCase()}`;
        const response = await axiosInstance.get(endpoint);
        setBookData(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [activeBookTab]);

  return (
    <div className="mt-24">
      <LoadingWrapper loading={loading}>
        {/* Webinars Section */}
        <div className="mx-10">
          <h1 className="text-white font-bold text-2xl my-7">Popular Webinars</h1>

          {/* Tabs for Webinars */}
          <div className="flex space-x-4 mb-4">
            {webinarTabs.map((tab) => (
              <button
                key={tab}
                className={`px-2 py-1 rounded-2xl ${
                  activeWebinarTab === tab
                    ? "bg-[#6449cc] text-white"
                    : "bg-transparent text-white hover:bg-[#6449cc] border border-white"
                }`}
                onClick={() => setActiveWebinarTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {webinarData.map((media) => (
              <MediaCard
                key={media.id}
                title={media.title}
                thumbnail={media.coverImageUrl}
                recentlyAdded={media.recentlyAdded}
                duration={media.duration}
                ageRating={media.ageRating}
                tags={media.tags}
                type={media.type}
                height={media.height}
                cardheight={media.cardheight}
                axiosUrl={"/webinars"}
                id={media.id}
              />
            ))}
          </div>
          <Link to={"/webinars"}>
            <button className="bg-transparent text-white opacity-60 hover:opacity-100 ease-in-out transition duration-300 font-semibold text-lg flex justify-end w-full">
              View All
            </button>
          </Link>
        </div>

        {/* Documentaries Section */}
        <div className="mx-10">
          <h1 className="text-white font-bold text-2xl my-7">Popular Documentaries</h1>

          {/* Tabs for Documentaries */}
          <div className="flex space-x-4 mb-4">
            {lectureTabs.map((tab) => (
              <button
                key={tab}
                className={`px-2 py-1 rounded-2xl ${
                  activeLectureTab === tab
                    ? "bg-[#6449cc] text-white"
                    : "bg-transparent text-white hover:bg-[#6449cc] border border-white"
                }`}
                onClick={() => setActiveLectureTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {lectureData.map((media) => (
              <MediaCard
                key={media.id}
                title={media.title}
                thumbnail={media.coverImageUrl}
                recentlyAdded={media.recentlyAdded}
                duration={media.duration}
                ageRating={media.ageRating}
                tags={media.tags}
                type={media.type}
                height={media.height}
                cardheight={media.cardheight}
                author={media.author}
                axiosUrl={"/lectures"}
                id={media.id}
                category={media.category}
              />
            ))}
          </div>
          <Link to={"/lectures"}>
            <button className="bg-transparent text-white opacity-60 hover:opacity-100 ease-in-out transition duration-300 font-semibold text-lg flex justify-end w-full">
              View All
            </button>
          </Link>
        </div>

        {/* Books Section */}
        <div className="mx-10">
          <h1 className="text-white font-bold text-2xl my-7">Popular Books</h1>

          {/* Tabs for Books */}
          <div className="flex space-x-4 mb-4">
            {bookTabs.map((tab) => (
              <button
                key={tab}
                className={`px-2 py-1 rounded-2xl ${
                  activeBookTab === tab
                    ? "bg-[#6449cc] text-white"
                    : "bg-transparent text-white hover:bg-[#6449cc] border border-white"
                }`}
                onClick={() => setActiveBookTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {bookData.map((media) => (
              <MediaCard
                key={media.id}
                title={media.title}
                thumbnail={media.coverImageUrl}
                recentlyAdded={media.recentlyAdded}
                duration={media.duration}
                ageRating={media.ageRating}
                tags={media.tags}
                type={media.type}
                height={350}
                cardheight={350}
                author={media.author}
                axiosUrl={"/books"}
                id={media.id}
                genre={media.genre}
              />
            ))}
          </div>
          <Link to={"/books"}>
            <button className="bg-transparent text-white opacity-60 hover:opacity-100 ease-in-out transition duration-300 font-semibold text-lg flex justify-end w-full">
              View All
            </button>
          </Link>
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default Popular;
