import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MediaModal from "../Components/Modals/MediaModal";

const MediaCard = ({
  title,
  thumbnail,
  recentlyAdded,
  duration,
  ageRating,
  height,
  cardheight,
  author,
  type,
  id,
  axiosUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const resolvedHeight = height || "350px";
  const cardHeight = cardheight || "200px";

  const handleHoverStart = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 100);
  };

  const handleHoverEnd = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(false);
  };

  const handleCardClick = () => {
    navigate(`${axiosUrl === "/lectures" ? "/documentaries" : `${axiosUrl}`}/${id}`);
  };

  const toggleModal = (e) => {
    e.stopPropagation(); // Prevent triggering card click
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <motion.div
        className="relative cursor-pointer"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onClick={handleCardClick}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="relative bg-black text-white rounded-lg shadow-lg overflow-hidden"
          style={{ height: cardHeight }}
        >
          <div className="relative w-full h-full">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-0 w-full p-4">
            {recentlyAdded && (
              <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
                Recently Added
              </span>
            )}
          </div>

          {isHovered && (
            <motion.div
              className="absolute bottom-0 w-full p-4 bg-[#0d0d0d]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <div className="flex items-center space-x-4 mb-4 flex-row">
                <div className="flex-1 space-x-2">
                  <button
                    className="items-center justify-center bg-white text-black w-10 h-10 rounded-full hover:bg-gray-200 ease-in-out transition duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PlayArrowIcon />
                  </button>
                  <button
                    className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AddIcon />
                  </button>
                  <button
                    className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ThumbUpAltOutlinedIcon />
                  </button>
                </div>
                <div>
                  <button
                    className="flex items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300"
                    onClick={toggleModal}
                  >
                    <ExpandMoreIcon />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mt-1">
                  {duration || type || author} • {ageRating || "Unrated"}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {isModalOpen && (
        <MediaModal
          id={id}
          onClose={() => setIsModalOpen(false)}
          axiosUrl={axiosUrl}
        />
      )}
    </>
  );
};

export default MediaCard;
