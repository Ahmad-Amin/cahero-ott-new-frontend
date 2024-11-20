import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import MediaCard from "../../Components/MediaCard";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axiosInstance.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching webinars:", error);
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="mt-28 mx-8">
      <p className="text-3xl text-white  mb-5 font-semibold">All Books</p>{" "}
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
    </div>
  );
};

export default Books;
