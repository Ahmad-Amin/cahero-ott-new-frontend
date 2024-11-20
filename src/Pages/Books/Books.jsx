import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import MediaCard from "../../Components/MediaCard";
import LoadingWrapper from "../../ui/LoadingWrapper";
import SearchBar from "../../Components/SearchBar";

const Books = () => {
  const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching webinars:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="mt-28 mx-8">
<div className="flex flex-row">
        <div className="flex-1">
          <p className="text-3xl text-white font-semibold">All books</p>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>      <LoadingWrapper loading={loading}>
      <div className=" grid grid-cols-6 gap-6">
        {books.map((media) => (
          <MediaCard
            key={media.id}
            title={media.title}
            thumbnail={media.coverImageUrl}
            recentlyAdded={media.recentlyAdded}
            duration={media.duration}
            ageRating={media.ageRating}
            tags={media.tags}
            type={media.type}
            author={media.author}
            data={media.startDate}
            cardheight="350px"
            height="400px"  
          />
        ))}
      </div>
      </LoadingWrapper>
    </div>
  );
};

export default Books;
