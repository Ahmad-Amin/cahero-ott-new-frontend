import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import WebinarCard from "../../Components/WebinarCard";
import LoadingWrapper from "../../ui/LoadingWrapper";
import SearchBar from "../../Components/SearchBar";

const Webinars = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/webinars?type=upcomming");
        setWebinars(response.data);
      } catch (error) {
        console.error("Error fetching webinars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="mt-28 mx-8">
      <div className="flex flex-row">
        <div className="flex-1">
          <p className="text-3xl text-white font-semibold">Upcomming Webinars</p>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <LoadingWrapper loading={loading}>

      <div className=" grid grid-cols-3 gap-6">
        {webinars.map((media) => (
          <WebinarCard
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
            cardheight={"300px"}
            height={"400px"}
          />
        ))}
      </div>
      </LoadingWrapper>

    </div>
  );
};

export default Webinars;
