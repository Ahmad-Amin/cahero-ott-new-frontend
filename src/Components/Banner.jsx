import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../lib/axiosInstance";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
function Banner() {
  const currentUser = useSelector((state) => state.auth.user);
  const [latestWebinar, setLatestWebinar] = useState(null);

  useEffect(() => {
    const fetchLatestWebinar = async () => {
      try {
        const response = await axiosInstance.get("/webinars");
        if (response.data && response.data.length > 0) {
          const sortedWebinars = response.data.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          );
          setLatestWebinar(sortedWebinars[0]);
        }
      } catch (error) {
        console.error("Failed to fetch webinars:", error);
      }
    };

    fetchLatestWebinar();
  }, []);

  return (
    <div >
      <div className="relative mt-16">
      <img
        src={
          latestWebinar?.coverImageUrl ||
          `${process.env.PUBLIC_URL}/images/Rectangle.png`
        }
        alt="Webinar Banner"
        className="w-full h-[80vh] md:h-[75vh] lg:h-[75vh] xl:h-[75vh] opacity-50 object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 mb-32 p-4 ml-12 text-left w-1/2">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold mb-2">
          {latestWebinar ? latestWebinar.title : "Ongoing Webinar"}
        </h1>
        <p className="text-white font-normal text-xl opacity-70 mb-5">{latestWebinar ? latestWebinar.description : "XYZ XSY SAJH AJJHS AJJAS"}</p>
          <div className="flex flex-row gap-4">
          <button className="bg-[#6a55ea] gap-1 flex items-center hover:bg-[#7e5cff] ease-in-out transition duration-300 h-10 w-auto px-5 rounded-md text-white text-lg font-semibold">
            <PlayArrowIcon/>
            Play
          </button>
          <button className="bg-[#3a3a3a] gap-1 flex items-center hover:bg-[#606060] ease-in-out transition duration-300 h-10 w-auto px-3 rounded-md text-white text-lg font-semibold">
            <InfoIcon/>
            More Info
          </button>
          </div>
      </div>
    </div>
    </div>
  );
}

export default Banner;
