import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import modules
import MediaCard from "../MediaCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../lib/axiosInstance";

const MediaCarousel = ({ heading, height, cardheight, axiosURL, cardsSpace }) => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await axiosInstance.get(axiosURL);
        setMediaData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching media data:", error);
        setLoading(false);
      }
    };

    fetchMediaData();
  }, [axiosURL]); 

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-white font-bold text-xl mb-2">{heading}</h1>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={cardsSpace}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }} 
        className="relative"
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
      >
        {mediaData.map((media) => (
          <SwiperSlide key={media.id}>
            <MediaCard
              title={media.title}
              thumbnail={media.coverImageUrl}
              recentlyAdded={media.recentlyAdded}
              duration={media.duration}
              ageRating={media.ageRating}
              tags={media.tags}
              type={media.type}
              height={height}
              cardheight={cardheight}
              author={media.author}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediaCarousel;
