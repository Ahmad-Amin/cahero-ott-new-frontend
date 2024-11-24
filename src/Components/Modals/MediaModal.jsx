import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../Slice/AuthSlice";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";

const MediaModal = ({ id, onClose, axiosUrl }) => {
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();

  // Sync isFavorite state whenever the user or favorites list changes
  useEffect(() => {
    if (user && user.favorites) {
      setIsFavorite(user.favorites.some((favorite) => favorite.item === id));
    }
  }, [user, id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.warning("Please log in to manage favorites!");
      return;
    }

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
      toast.error("Something went wrong while updating favorites.");
    } finally {
      fetchLatestUsers();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${axiosUrl}/${id}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosUrl]);

  const fetchLatestUsers = async () => {
    try {
      const response = await axiosInstance.get("/me");
      dispatch(updateUser({ user: response.data }));
    } catch (error) {
      console.error("Error fetching latest users:", error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (loading) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <LoadingWrapper loading={loading} />
      </div>,
      document.body
    );
  }

  if (error) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 flex-col space-y-4">
        <div className="text-red-500">{error}</div>
        <button
          className="bg-white text-black font-semibold text-lg w-auto px-3 h-8 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>,
      document.body
    );
  }

  return ReactDOM.createPortal(
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-zinc-900 bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-black rounded-lg shadow-lg overflow-hidden w-1/2 relative ">
        <button
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400 z-10"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col">
          <div className="w-full relative h-[60vh] overflow-hidden">
            <img
              src={data.coverImageUrl}
              alt={data.title}
              className="w-full h-full object-cover"
            />

            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, black, transparent 100%)",
                opacity: 1,
              }}
            ></div>
            <div className="absolute bottom-4 left-4 flex space-x-4 z-10">
              <button className="bg-[#6a55ea] text-white py-2 px-4 rounded-lg hover:bg-[#5242b6] ease-in-out transition duration-300">
                <PlayArrowIcon />
                Play Now
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
              <button className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
                <ThumbUpAltOutlinedIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-row p-4 gap-2 text-white items-center">
            <p className="border border-[#565656] text-[#565656] h-5 px-1 text-xs">
              France
            </p>
            <p className="text-white font-thin text-md opacity-60">
              {data.duration ||
                (data.startDate ? data.startDate.split("T")[0] : null || data.author || null)}
            </p>
            <p className="border border-[#565656] text-[#565656] h-5 px-1 mr-2 text-xs">
              HD
            </p>
            <p className="border border-[#565656] text-[#565656] h-5 px-1 mr-2 text-xs">
              2024
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 px-4">
              {data.category || data.genre || data.type || null}
            </p>
          </div>
          <div className="px-4 text-white">
            <h2 className="mt-2 text-2xl font-semibold">{data.title}</h2>
            <p className="text-md opacity-60 line-clamp-3 text-ellipsis mb-10">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MediaModal;
