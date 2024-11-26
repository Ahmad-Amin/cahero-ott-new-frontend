import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import MediaCard from "../MediaCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";
import "../../index.css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NumberCarousel = ({
  heading,
  height,
  cardheight,
  axiosURL,
  cardsSpace,
  slides,
}) => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await axiosInstance.get(`${axiosURL}`);
        setMediaData(response.data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching media data:", error);
        setLoading(false);
      }
    };

    fetchMediaData();
  }, [axiosURL]);

  if (loading) {
    return (
      <div className="text-white text-center">
        <LoadingWrapper loading={loading} />
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-white font-bold text-xl mb-2">{heading}</h1>

      <div className="ml-20">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={cardsSpace || 40}
          slidesPerView={slides}
          navigation
          pagination={{ clickable: true, el: ".custom-pagination" }}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          className="relative overflow-hidden"
        >
          {mediaData.map((media, index) => (
            <SwiperSlide key={media.id}>
              <div className="relative">
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 text-[11rem] font-bold text-white text-outline opacity-30">
                  {index + 1}
                </div>
                <MediaCard
                  title={media.title}
                  thumbnail={media.coverImageUrl}
                  recentlyAdded={media.recentlyAdded}
                  duration={media.duration}
                  ageRating={media.ageRating}
                  type={media.type}
                  height={height}
                  cardheight={cardheight}
                  author={media.author}
                  id={media.id}
                  axiosUrl={axiosURL}
                  category={media.category}
                  genre={media.genre}
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="custom-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default NumberCarousel;
