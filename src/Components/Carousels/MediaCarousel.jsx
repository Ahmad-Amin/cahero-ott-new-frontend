import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Import modules
import MediaCard from "../MediaCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";

const MediaCarousel = ({
  heading,
  height,
  cardheight,
  axiosURL,
  cardsSpace,
}) => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = axiosURL;

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(axiosURL);
        console.log(response.data);
        setMediaData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching media data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaData();
  }, [axiosURL]);

  return (
    <div className="p-10">
      <LoadingWrapper loading={loading}>
        <h1 className="text-white font-bold text-xl mb-2">{heading}</h1>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={cardsSpace}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          className="relative overflow-visible"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {mediaData.map((media) => {
            return (
              <SwiperSlide key={media.id} className="relative overflow-visible">
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
                  axiosUrl={URL}
                  id={media.id}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </LoadingWrapper>
    </div>
  );
};

export default MediaCarousel;
