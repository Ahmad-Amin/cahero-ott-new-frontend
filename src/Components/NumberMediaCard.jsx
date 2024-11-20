import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NumberMediaCard = ({
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
  type
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
    <div className="flex flex-row items-center mx-5">
      <div className="absolute text-9xl leading-none font-bold text-outline text-white justify-end">
    5
      </div>
    <motion.div
      className="relative ml-14 bg-black text-white rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      initial={{ height: "500px" }}
      animate={{ height: cardHeight }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full overflow-hidden"
        // animate={{ y: isHovered ? "-20px" : "0px" }}
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
    </motion.div>
    </div>
  );
};

export default NumberMediaCard;
