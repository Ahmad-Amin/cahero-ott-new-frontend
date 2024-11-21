import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const MediaModal = ({ id, onClose, axiosUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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
  }, [id]);

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

  const handleOverlayClick = (e) => {
    // Check if the clicked element is the overlay
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-black rounded-lg shadow-lg overflow-hidden w-1/2 relative">
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
              <button className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
                <AddIcon />
              </button>
              <button className="items-center justify-center border border-[#868686] text-[#868686] w-10 h-10 rounded-full hover:bg-white hover:bg-opacity-10 ease-in-out transition duration-300">
                <ThumbUpAltOutlinedIcon />
              </button>
            </div>
          </div>

          <div className="md:w-1/2 p-6 text-white">
            <p>{data.duration || data.startDate.split("T")[0] || null}</p>
            <h2 className="mt-2 text-2xl font-semibold">{data.title}</h2>
            <p className=" text-md opacity-60 line-clamp-3 text-ellipsis">{data.description}</p>
            
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MediaModal;
