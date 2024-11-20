import React from "react";
import Banner from "../../Components/Banner";
import MediaCarousel from "../../Components/Carousels/MediaCarousel";
import NumberCarousel from "../../Components/Carousels/NumberCarousel";
const Homepage = () => {
  return (
    <div>
      <Banner />
      <NumberCarousel
        heading={"Top Documentaries for you"}
        axiosURL={"/lectures"}
        height="350px"
        cardheight="200px"
        cardsSpace={90}
        slides={4}
      />
      <MediaCarousel
        heading={"Recently Upload Documentaries"}
        axiosURL={"/lectures"}
        cardsSpace={10}
      />
      <NumberCarousel
        heading={"Recommended Webinars for you"}
        axiosURL={"/webinars?type=past"}
        height="350px"
        cardheight="200px"
        cardsSpace={90}
        slides={4}
      />
      <MediaCarousel
        heading={"Upcomming Webinars"}
        axiosURL={"/webinars"}
        cardsSpace={10}
      />
      <MediaCarousel
        heading={"Latest Books"}
        height={"400px"}
        cardheight={"400px"}
        axiosURL={"/books"}
        cardsSpace={40}
      />
      <NumberCarousel
        heading={"Recommended Books"}
        axiosURL={"/webinars?type=past"}
        height="350px"
        cardheight="350px"
        cardsSpace={90}
        slides={5}
      />
    </div>
  );
};

export default Homepage;
