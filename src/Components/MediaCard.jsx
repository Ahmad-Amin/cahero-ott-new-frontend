import React, { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";
import MediaModal from "../Components/Modals/MediaModal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";
import { updateUser } from "../Slice/AuthSlice";

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
  category,
  genre
}) => {
  const { user } = useSelector((state) => state.auth.user);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.some((favorite) => favorite.item === id) || false
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resolvedHeight = height || "350px";
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

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorite) {
        await axiosInstance.delete(`/webinars/${id}/favorite`);
        setIsFavorite(false);
        toast.success("Removed from Favourites");
      } else {
        await axiosInstance.post(`/webinars/${id}/favorite`);
        setIsFavorite(true);
        toast.success("Added To Favourites");
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
    } finally {
      fetchLatestUsers();
    }
  };

  const fetchLatestUsers = async () => {
    try {
      const response = await axiosInstance.get("/me");
      dispatch(updateUser({ user: response.data }));
    } catch (error) {
      console.error("Error fetching latest users:", error);
    }
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
          {/* Thumbnail */}
          <div className="relative w-full h-full z-10 hover:-translate-y-8 ease-in-out transition duration-300">
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
            <div className="flex items-center space-x-4 mb-4 flex-row">
              <div className="flex-1 space-x-2">
                <button
                  className="items-center justify-center bg-white text-black w-10 h-10 rounded-full hover:bg-gray-200 transition duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PlayArrowIcon />
                </button>
                {isFavorite ? (
                  <button
                    className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
                    onClick={toggleFavorite}
                  >
                    <DoneIcon />
                  </button>
                ) : (
                  <button
                    className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
                    onClick={toggleFavorite}
                  >
                    <AddIcon />
                  </button>
                )}
                <button
                  className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ThumbUpAltOutlinedIcon />
                </button>
              </div>
              <div>
                <button
                  className="flex items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
                  onClick={toggleModal}
                >
                  <ExpandMoreIcon />
                </button>
              </div>
            </div>
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
          axiosUrl={axiosUrl}
        />
      )}
    </>
  );
};

export default MediaCard;
