import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WebinarCard = ({
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
  key,
  data
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
      initial={{ height: cardHeight }}
      animate={{ height: cardHeight }}
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
          <div className="flex items-center space-x-4 mb-4 justify-between">
            <button className="flex items-center justify-center bg-[#6a55ea] text-white font-medium h-8 rounded-sm w-auto px-3 hover:bg-[#7e5cff] ease-in-out transition duration-300">
              Join Now
            </button>
            <button className="flex items-center justify-center bg-transparent text-[#565656] font-bold w-10 h-10 rounded-full border border-[#565656] hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
              <ExpandMoreIcon />
            </button>
          </div>
          <h3 className="text-xl font-thin mb-2 opacity-50">{data.split("T")[0] || null}</h3>
          <h3 className="text-sm font-medium mb-2">{title}</h3>
          <div>
          {/* <p className="text-sm text-gray-400 mt-1">
                {duration || type || author} • {ageRating || "Unrated"}
              </p> */}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WebinarCard;
