import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axiosInstance";
import MediaCard from "../../Components/MediaCard";
import LoadingWrapper from "../../ui/LoadingWrapper";

const Favorite = () => {
  const [activeTab, setActiveTab] = useState("webinars");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let url;
      switch (tab) {
        case "webinars":
          url = "/webinars/favorites";
          break;
        case "books":
          url = "/books/favorites";
          break;
        case "documentaries":
          url = "/lectures/favorites";
          break;
        default:
          url = "/webinars/favorites";
      }

      const response = await axiosInstance.get(url);
      const items = response?.data?.favorites?.map((fav) => fav.item) || [];
      setData(items);
      console.log("items",items)
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    fetchData(activeTab);
  }, [activeTab]);

  const renderContent = () => {
    if (data.length === 0)
      return (
        <p className="w-full h-full text-white font-semibold text-lg flex justify-center items-center">
          No favorites found.
        </p>
      );

    switch (activeTab) {
      case "webinars":
        return (
          <div className="grid grid-cols-4 gap-6 mt-10">
            {data.map((webinar) => (
              <MediaCard
                  title={webinar.title}
                  thumbnail={webinar.coverImageUrl}
                  recentlyAdded={webinar.recentlyAdded}
                  tags={webinar.tags}
                  type={webinar.type}
                  axiosUrl={"/webinars"}
                  id={webinar.id}
                />
            ))}
          </div>
        );
      case "books":
        return (
          <div className="grid grid-cols-4 gap-6 mt-10">
            {data.map((book) => (
              <MediaCard
              title={book.title}
              thumbnail={book.coverImageUrl}
              recentlyAdded={book.recentlyAdded}
              duration={book.duration}
              ageRating={book.ageRating}
              tags={book.tags}
              type={book.type}
              height={350}
              cardheight={350}
              author={book.author}
              axiosUrl={"/books"}
              id={book.id}
            />
            ))}
          </div>
        );
      case "documentaries":
        return (
          <div className="grid grid-cols-3 gap-6 mt-10">
            {data.map((document) => (
              <MediaCard
              title={document.title}
              thumbnail={document.coverImageUrl}
              recentlyAdded={document.recentlyAdded}
              duration={document.duration}
              ageRating={document.ageRating}
              tags={document.tags}
              type={document.type}
              author={document.author}
              axiosUrl={"/lectures"}
              id={document.id}
            />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
        <LoadingWrapper loading={loading}>
          <div className="ml-8 mt-28">
            <div className="tabs space-x-10 text-xl font-bold">
              <button
                className={`text-white ${
                  activeTab === "webinars" ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveTab("webinars")}
              >
                Webinars
              </button>
              <button
                className={`text-white ${
                  activeTab === "books" ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveTab("books")}
              >
                Books
              </button>
              <button
                className={`text-white ${
                  activeTab === "documentaries" ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveTab("documentaries")}
              >
                Documentaries
              </button>
            </div>

            <div className="content">{renderContent()}</div>
          </div>
        </LoadingWrapper>
    </>
  );
};

export default Favorite;
