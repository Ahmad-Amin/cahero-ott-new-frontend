import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
<<<<<<< Updated upstream
=======
import { Link } from "react-router-dom";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
  id,
  axiosUrl,
>>>>>>> Stashed changes
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const resolvedHeight = height || "350px";
<<<<<<< Updated upstream
  const resolvedCardHeight = cardheight || "200px";

=======
  const cardHeight = cardheight || "200px";
console.log("id",id)
>>>>>>> Stashed changes
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

  return (
    <motion.div
      className="relative"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
<<<<<<< Updated upstream
      style={{
        height: resolvedCardHeight,
      }}
    >
      <motion.div
        className="absolute w-full h-full overflow-hidden z-0"
        animate={{ y: isHovered ? "0" : "0px" }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Recently Added Badge */}
      <div className="absolute bottom-0 w-full p-4 z-10">
        {recentlyAdded && (
          <span className="bg-red-500 text-white px-2 py-1 text-sm rounded">
            Recently Added
          </span>
        )}
      </div>

      {/* Hover Content */}
      <motion.div
        className="absolute bottom-0 w-full p-4 bg-[#0d0d0d] z-20"
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }} // Slide up on hover, down on exit
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center space-x-4 mb-4">
          <button className="flex items-center justify-center bg-white text-black w-10 h-10 rounded-full hover:bg-gray-200 transition">
            <PlayArrowIcon />
          </button>
          <button className="flex items-center justify-center bg-gray-700 text-white w-10 h-10 rounded-full hover:bg-gray-600 transition">
            <CheckCircleOutlineIcon />
          </button>
          <button className="flex items-center justify-center bg-gray-700 text-white w-10 h-10 rounded-full hover:bg-gray-600 transition">
            <ThumbUpAltOutlinedIcon />
          </button>
          <button className="flex items-center justify-center bg-gray-700 text-white w-10 h-10 rounded-full hover:bg-gray-600 transition">
            <ExpandMoreIcon />
          </button>
        </div>
        <div>
          <p className="text-sm text-gray-400 mt-1">
            {duration || type || author} • {ageRating || "Unrated"}
          </p>
        </div>
      </motion.div>
=======
      initial={{ scaleY: 1 }}
      animate={{ scaleY: isHovered ? 1.2 : 1 }}
      transition={{ duration: 0.3 }}
    >
<Link to={`${axiosUrl === '/lectures' ? '/documentaries' : `${axiosUrl}`}/${id}`}>

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
                  <button className="items-center justify-center bg-white text-black w-10 h-10 rounded-full hover:bg-gray-200 ease-in-out transition duration-300">
                    <PlayArrowIcon />
                  </button>
                  <button className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
                    <AddIcon />
                  </button>
                  <button className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
                    <ThumbUpAltOutlinedIcon />
                  </button>
                </div>
                <div>
                  <button className="flex items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
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
      </Link>
>>>>>>> Stashed changes
    </motion.div>
  );
};

export default MediaCard;
