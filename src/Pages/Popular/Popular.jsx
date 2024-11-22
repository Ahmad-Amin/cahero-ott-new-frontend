import React, { useEffect, useState } from "react";
import MediaCard from "../../Components/MediaCard";
import axiosInstance from "../../lib/axiosInstance";
import { Link } from "react-router-dom";
import LoadingWrapper from "../../ui/LoadingWrapper";
const Popular = () => {
  const [webinarData, setWebinarData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [lectureData, setLectureData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/webinars");
        const data = response.data;
        setWebinarData(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching media data:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchWebinars();
  }, []);

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/lectures");
        const data = response.data;
        setLectureData(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching media data:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchLecture();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get("/books");
        const data = response.data;
        setBookData(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
      finally{
        setLoading(false)
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="mt-24">
        <LoadingWrapper loading={loading}>
      <div className="mx-10">
        <h1 className="text-white font-bold text-2xl my-5">Popular Webinars</h1>
        <div className="grid grid-cols-4 gap-4">
          {webinarData.map((media) => (
            <MediaCard
              key={media.id}
              title={media.title}
              thumbnail={media.coverImageUrl}
              recentlyAdded={media.recentlyAdded}
              duration={media.duration}
              ageRating={media.ageRating}
              tags={media.tags}
              type={media.type}
              height={media.height}
              cardheight={media.cardheight}
              axiosUrl={"/webinars"}
              id={media.id}
            />
          ))}
        </div>
        <Link to={"/webinars"}>
        <button className="bg-transparent text-white opacity-60 hover:opacity-100 ease-in-out transition duration-300 font-semibold text-lg flex justify-end w-full">
          View All
        </button>
        </Link>
      </div>
      <div className="mx-10">
        <h1 className="text-white font-bold text-2xl my-5">
          Popular Documentaries
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {lectureData.map((media) => (
            <MediaCard
              key={media.id}
              title={media.title}
              thumbnail={media.coverImageUrl}
              recentlyAdded={media.recentlyAdded}
              duration={media.duration}
              ageRating={media.ageRating}
              tags={media.tags}
              type={media.type}
              height={media.height}
              cardheight={media.cardheight}
              author={media.author}
              axiosUrl={"/lectures"}
              id={media.id}
            />
          ))}
        </div>
        <Link to={"/lectures"}>
        <button className="bg-transparent text-white opacity-60 hover:opacity-100 ease-in-out transition duration-300 font-semibold text-lg flex justify-end w-full">
          View All
        </button></Link>
      </div>
      <div className="mx-10">
        <h1 className="text-white font-bold text-2xl my-5">Popular Books</h1>
        <div className="grid grid-cols-5 gap-4">
          {bookData.map((media) => (
            <MediaCard
              key={media.id}
              title={media.title}
              thumbnail={media.coverImageUrl}
              recentlyAdded={media.recentlyAdded}
              duration={media.duration}
              ageRating={media.ageRating}
              tags={media.tags}
              type={media.type}
              height={350}
              cardheight={350}
              author={media.author}
              axiosUrl={"/books"}
              id={media.id}
            />
          ))}
        </div>
        <Link to={"/books"}>
        <button className="bg-transparent text-white opacity-60 hover:opacity-100 ease-in-out transition duration-300 font-semibold text-lg flex justify-end w-full">
          View All
        </button>
        </Link>
      </div>
      </LoadingWrapper>
    </div>
  );
};
export default Popular;
