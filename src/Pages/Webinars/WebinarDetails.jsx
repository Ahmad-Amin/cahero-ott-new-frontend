import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// import LoginedNavbar from "../components/LoginedNavbar";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both outlined and filled heart icons
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";
import { useDispatch, useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
import RatingsReviews from "../../Components/RatingsReview";
import Comments from "../../Components/Comments";
import { updateUser } from "../../Slice/AuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md"; // Importing the left arrow icon from React Icons

const type = "webinar";

const WebinarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webinar, setWebinar] = useState(null);
  const [webinarLiveStatus, setWebinarLiveStatus] = useState(null);
  const [isWatchNowEnabled, setIsWatchNowEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.some((favorite) => favorite.item === id)
  );
  const dispatch = useDispatch();

  const handleCommentAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Fetch webinar details
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/webinars/${id}`);
        setWebinar(response.data);
      } catch (error) {
        console.log("Error fetching the webinars");
      }
    })();
  }, [id]);

  // Check webinar live status
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await axiosInstance.post(`/webinars/${id}/join`);
        setWebinarLiveStatus("Webinar is live");
        setIsWatchNowEnabled(true);
      } catch (error) {
        if (error.response && error.response.status !== 500) {
          setWebinarLiveStatus("Webinar is not live");
        } else {
          setWebinarLiveStatus("Error checking webinar status");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/${type}s/${id}/reviews/stats`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch review stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, [type, id]);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const fetchLatestUsers = async () => {
    const response = await axiosInstance.get("/me");
    dispatch(updateUser({ user: response.data }));
  };

  const handleWatchNow = () => {
    if (isWatchNowEnabled) {
      navigate(`/webinar/${id}/user-lobby`);
    }
  };

  return (
    <div className="mt-24">
      <LoadingWrapper loading={loading}>
        <Link to={"/webinars"}>
          <button
            style={{ zIndex: 3 }}
            className="relative flex items-center bg-transparent text-white mx-5 opacity-75 hover:opacity-100 text-lg font-semibold"
          >
            <MdArrowBack className="mr-2" />
            BACK
          </button>
        </Link>

        {webinar && (
          <div
            style={{ position: "relative", zIndex: 2 }}
            className="mt-12 mx-4 md:mx-8 flex flex-row items-center justify-start"
          >
            <div>
              <img
                src={
                  webinar.coverImageUrl ||
                  `${process.env.PUBLIC_URL}/images/Rectangle1.png`
                }
                alt=""
                className="w-full rounded-xl md:w-[328px] h-[296px] object-cover"
              />
            </div>
            <div className="mt-10 mx-5 w-full lg:w-2/4 ">
              <div className="flex justify-between items-center">
                <h1 className="text-white text-3xl font-semibold">
                  {webinar.title}
                </h1>
                <div className="mx-0 flex items-center gap-1 text-[#FFC01E]">
                  {[...Array(5)].map((_, index) =>
                    index < Math.round(stats?.averageRating) ? (
                      <FaStar key={index} fontSize="medium" />
                    ) : (
                      <FaRegStar key={index} fontSize="medium" />
                    )
                  )}
                  <p className="text-white text-lg font-medium">
                    {stats.averageRating}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-2 flex-wrap">
                <p className="text-white text-lg font-medium mr-4">
                  {webinar.startDate.split("T")[0] || null}
                </p>
              </div>
              <div className="text-lg font-medium mr-4">
                <p className="text-[#b2b2b2]">
                  {webinar.startTime} - {webinar.endTime}
                </p>
              </div>
              <div className="mt-2 mr-0">
                <p className="text-white text-base line-clamp-1 text-ellipsis">
                  {webinar.description}
                </p>
              </div>
              <div>
                {webinarLiveStatus && (
                  <div className="text-white mt-3 border-2 border-white border-dotted w-1/4 rounded-lg flex items-center justify-center py-1 font-semibold">
                    {webinarLiveStatus}
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <button
                  className={`h-16 w-full md:w-36 text-white rounded-2xl mt-3 ${
                    isWatchNowEnabled ? "bg-[#6a55ea]" : "bg-gray-500"
                  }`}
                  onClick={handleWatchNow}
                  disabled={!isWatchNowEnabled}
                >
                  Watch Now
                </button>
                <button
                  className="bg-white h-16 w-full md:w-16 text-black mx-0 md:mx-5 rounded-2xl mt-3 flex justify-center items-center"
                  onClick={toggleFavorite}
                >
                  {isFavorite ? (
                    <FaHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-20 w-1/2">
          <RatingsReviews type="webinar" key={refreshKey} className="z-20" />
        </div>
        <div className="mt-10 w-2/3">
          <Comments onCommentAdded={handleCommentAdded} type="webinar" />
        </div>
      </LoadingWrapper>
    </div>
  );
};

export default WebinarDetails;
