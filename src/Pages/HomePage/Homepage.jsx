import React from 'react'
import Banner from '../../Components/Banner'
import MediaCarousel from '../../Components/Carousels/MediaCarousel'
import NumberCarousel from '../../Components/Carousels/NumberCarousel'
const Homepage = () => {
  return (
    <div>
      <Banner/>
      <NumberCarousel heading={"Recently Upload Documentaries"} axiosURL={"/lectures"} cardsSpace={10}/>
      <MediaCarousel heading={"Recently Upload Documentaries"} axiosURL={"/lectures"} cardsSpace={10}/>
      <MediaCarousel heading={"Upcomming Webinars"} axiosURL={"/webinars"} cardsSpace={10}/>
      <MediaCarousel heading={"Latest Books"} height={"400px"} cardheight={"400px"} axiosURL={"/books"} cardsSpace={40}/>
    </div>
  )
}

export default Homepage
