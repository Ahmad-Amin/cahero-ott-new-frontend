import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/axiosInstance";
import WebinarCard from "../../Components/WebinarCard";

const Webinars = () => {
  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axiosInstance.get("/webinars?type=upcomming");
        setWebinars(response.data); 
      } catch (error) {
        console.error("Error fetching webinars:", error);
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="mt-28 mx-8">
<p className="text-3xl text-white  mb-5 font-semibold">
              Upcomming Webinars
            </p>        <div className=" grid grid-cols-3 gap-6">        
      {webinars.map((media) => (
        <WebinarCard
          key={media.id} 
          title={media.title}
          thumbnail={media.coverImageUrl}
          recentlyAdded={media.recentlyAdded}
          duration={media.duration}
          ageRating={media.ageRating}
          tags={media.tags}
          type={media.type}
          author={media.author}
          data={media.startDate}
          cardheight={"300px"}
          height={"400px"}
        />
      ))}
    </div>
    </div>
  );
};

export default Webinars;
