import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
// import LoginedNavbar from "../components/LoginedNavbar";
import { FaStar } from "react-icons/fa6";
import { FaHeart, FaRegHeart, FaRegStar } from "react-icons/fa";
import { FiPlayCircle } from "react-icons/fi";
import { RiBook2Line } from "react-icons/ri";
import AudioPlayer from "../../Components/AudioPlayer"; // Import your AudioPlayer component
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and useLocation
import { MdArrowBack } from "react-icons/md"; // Importing the left arrow icon from React Icons
import { useParams } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import LoadingWrapper from "../../ui/LoadingWrapper";
// import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import RatingsReviews from "../../Components/RatingsReview";
import Comments from "../../Components/Comments";
import { toast } from "react-toastify";
import { updateUser } from "../../Slice/AuthSlice";
const type = "book";


const BookDetails = () => {

  const { id: bookId } = useParams();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.some((favorite) => favorite.item === bookId)
  );
  const dispatch = useDispatch();

  const handleCommentAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/books/${bookId}`);
        setBook(response.data);
      } catch (e) {
        console.log("Error getting book", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/${type}s/${bookId}/reviews/stats`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch review stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, [type, bookId]);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      if (isFavorite) {
        await axiosInstance.delete(`/books/${bookId}/favorite`);
        setIsFavorite(false);
        toast.success("Removed from Favourites");
      } else {
        await axiosInstance.post(`/books/${bookId}/favorite`);
        setIsFavorite(true);
        toast.success("Added To Favourites");
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
      toast.error("Error Removing from favorite");
    } finally {
      fetchLatestUsers();
      setLoading(false);
    }
  };

  const fetchLatestUsers = async () => {
    const response = await axiosInstance.get("/me");
    dispatch(updateUser({ user: response.data }));
  };

  return (
    <div className="mt-24">
      
        <LoadingWrapper loading={loading} className="h-full">
          
          <Link to={"/books"}>
            <button
              style={{ zIndex: 3 }}
              className="relative flex items-center bg-transparent text-white mx-5 opacity-75 hover:opacity-100 text-lg font-semibold"
            >
              <MdArrowBack className="mr-2" />
              BACK
            </button>
          </Link>

          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              mt: 2,
              mx: { xs: 2, md: 8 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
              gap: { xs: 2, md: 4 },
            }}
          >
            <img
              className="w-full md:w-64 md:h-72 object-cover"
              src={
                book.coverImageUrl ||
                `${process.env.PUBLIC_URL}/images/image1.png`
              }
              alt="Book cover"
            />
            <Box className="mt-10" sx={{ flexGrow: 1 }}>
              <Typography className="text-white !text-2xl font-medium">
                {book.title}
              </Typography>
              <Typography className="text-white text-base font-normal opacity-70">
                by {book.author}
              </Typography>
              <div className="mt-2 flex items-center gap-1 text-[#FFC01E]">
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
              <Box className="flex items-center gap-2 mt-2 ">
                <p className="text-white font-semibold">Genre:</p>{" "}
                <p className="text-white font-normal opacity-80">
                  {book.genre}
                </p>
              </Box>
              <Box className="flex items-center mt-3 gap-3">
                <Box className="flex items-center mt-3">
                  <Button
                    variant="contained"
                    onClick={() => setIsAudioPlaying(true)}
                    sx={{
                      backgroundColor: "#6a55ea",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#5a47d1",
                      },
                      height: "64px",
                      width: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <FiPlayCircle />
                    Play Audio
                  </Button>
                  <Link to={`/all-books/${bookId}/read-book`}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/read-book")} // Navigate to /read-book on button click
                      sx={{
                        borderColor: "white", // White border
                        color: "white", // White text
                        height: "64px",
                        width: "160px",
                        marginLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)", 
                        },
                      }}
                    >
                      <RiBook2Line />
                      Read Book
                    </Button>
                  </Link>
                  <button
                    className="bg-white h-16 w-full md:w-16 text-black mx-0 md:mx-5 rounded-2xl flex justify-center items-center"
                    onClick={toggleFavorite}
                  >
                    {isFavorite ? (
                      <FaHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-6 h-6" />
                    )}
                  </button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              mt: 4,
              mx: { xs: 2, md: 8 },
            }}
          >
            <Typography className="text-white font-semibold text-sm">
              Summary
            </Typography>
            <Typography className="text-white font-light text-sm mt-2 opacity-70">
              {book.description}
            </Typography>
          </Box>
          <div className="mt-20 w-1/2">
            <RatingsReviews
              type="book"
              key={refreshKey}
              className="relative z-20"
            />
          </div>
          <div className="mt-10 w-2/3">
            <Comments onCommentAdded={handleCommentAdded} type="book" />
          </div>
          {isAudioPlaying && (
            <Box sx={{ mt: 3 }}>
              <AudioPlayer playing={isAudioPlaying} />
            </Box>
          )}
        </LoadingWrapper>
    </div>
  );
};

export default BookDetails;
