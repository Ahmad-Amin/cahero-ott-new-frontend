import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { data } from "autoprefixer";

const MediaCard = ({
  title,
  thumbnail,
  recentlyAdded,
  duration,
  ageRating,
  tags,
  height,
  cardheight,
  category,
  author,
  type,
  data,
  key
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const resolvedHeight = height || "350px";
  const cardHeight = cardheight || "200px";

  const handleHoverStart = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 1000);
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
      className="relative bg-black text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      initial={{ height: "500px" }}
      animate={{ height: isHovered ? resolvedHeight : cardHeight }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full overflow-hidden"
        animate={{ y: isHovered ? "-20px" : "0px" }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute bottom-0 w-full  p-4">
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
      )}
    </motion.div>
  );
};

export default MediaCard;
