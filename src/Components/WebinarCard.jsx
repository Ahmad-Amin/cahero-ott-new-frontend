import React, { useState, useRef } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MediaModal from "../Components/Modals/MediaModal";


const WebinarCard = ({
  title,
  thumbnail,
  duration,
  cardheight,
  author,
  type,
  id,
  axiosUrl,
  category,
  genre,
  date,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const cardHeight = cardheight || "200px";

  const handleCardClick = () => {
    navigate(
      `${axiosUrl === "/lectures" ? "/documentaries" : `${axiosUrl}`}/${id}`
    );
  };

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      <div
        className="relative cursor-pointer transition-transform duration-300 "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div
          className="relative bg-black text-white rounded-lg shadow-lg"
          style={{ height: cardHeight }}
        >
          <div
            className={`relative w-full h-full z-10 transition-transform duration-300 ${
              isHovered ? "-translate-y-5" : ""
            }`}
          >
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className={`absolute bottom-0 w-full p-4 bg-[#0d0d0d] text-white transition-all duration-300 ${
              isHovered
                ? "translate-y-24 opacity-100 z-50"
                : "translate-y-full opacity-0"
            }`}
          >
            <div className="flex items-center space-x-4 mb-4 justify-between">
              <button className="flex items-center justify-center bg-[#6a55ea] text-white font-medium h-8 rounded-sm w-auto px-3 hover:bg-[#7e5cff] ease-in-out transition duration-300">
                Join Now
              </button>
              <button
                onClick={toggleModal}
                className="flex items-center justify-center bg-transparent text-[#565656] font-bold w-10 h-10 rounded-full border border-[#565656] hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300"
              >
                <ExpandMoreIcon />
              </button>
            </div>
            <h3 className="text-xl font-thin mb-2 opacity-50">
            {date.split("T")[0] || null}
            </h3>
            <h3 className="text-sm font-medium mb-2">{title}</h3>
            <div>
              <div className="flex flex-row items-center mb-2 mt-1">
                <p className="border border-[#565656] text-[#565656] h-5 px-1 mr-2 text-xs">
                  France
                </p>
                <p className="text-sm text-gray-400">
                  {duration || type || author}
                </p>
                <p className="border border-[#565656] text-[#565656] h-5 px-1 ml-2 text-xs">
                  HD
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {category || null || genre}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MediaModal
          id={id}
          onClose={() => setIsModalOpen(false)}
          axiosUrl={"/webinars"}
        />
      )}
    </>
  );
};

export default WebinarCard;
