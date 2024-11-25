import React from "react";
import Banner from "../../Components/Banner";
import MediaCarousel from "../../Components/Carousels/MediaCarousel";
import NumberCarousel from "../../Components/Carousels/NumberCarousel";
const Homepage = () => {
  return (
    <div className="pb-20 overflow-hidden">
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
        slide={5}
      />
      <NumberCarousel
        heading={"Recommended Webinars for you"}
        axiosURL={"/webinars"}
        height="350px"
        cardheight="200px"
        cardsSpace={90}
        slides={4}
      />
      <MediaCarousel
        heading={"Upcomming Webinars"}
        axiosURL={"/webinars"}
        cardsSpace={10}
        slide={5}
      />
      <NumberCarousel
        heading={"Recommended Books"}
        axiosURL={"/books"}
        height="300px"
        cardheight="300px"
        cardsSpace={90}
        slides={4.5}
      />
      <MediaCarousel
        heading={"Latest Books"}
        height={"300px"}
        cardheight={"300px"}
        axiosURL={"/books"}
        cardsSpace={40}
        slide={5.5}
      />
    </div>
  );
};

export default Homepage;
