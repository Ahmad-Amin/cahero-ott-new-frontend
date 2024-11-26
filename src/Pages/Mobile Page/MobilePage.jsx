import React from "react";

const MobilePage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center overflow-hidden">
      <div className="w-full h-screen flex flex-col items-center bg-black">
        {/* Header */}
        <header className="w-full flex justify-between items-center px-4 py-3">
          <h1 className="text-lg sm:text-xl font-bold">CAHERO</h1>
          <div className="text-xl sm:text-2xl">≡</div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col h-full items-center text-center mt-4 sm:mt-6 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            Sed Imperdiet Enim Ii <br />
            Vitae <span className="text-purple-500">Viverra Justo</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-3 sm:mt-4">
            Nam sollicitudin nunc, cursus eros vulputate sed. <br />
            Vestibulum sit amet tortor sit amet libero lobortis.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-6">
            <button className="bg-white text-black px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center text-sm sm:text-base">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              />
              App Store
            </button>
            <button className="bg-white text-black px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center text-sm sm:text-base">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/58/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              />
              Google Play
            </button>
          </div>

          {/* Images Section */}
          <div className="relative mt-6 sm:mt-10 flex items-center justify-center w-full min-h-[400px] h-full">

            {/* Background Images */}
            <img
              src={`/Images/bg1.png`}
              alt="bg 1"
              className="absolute bottom-0 w-full"
            />
            <img
              src={`/Images/bg2.png`}
              alt="bg 2"
              className="absolute bottom-0 w-full"
            />

            {/* Phones */}
            <img
              src={`/Images/mob2.png`}
              alt="Phone 1"
              className="absolute w-[350px] left-0 z-10"
            />
            <img
              src={`/Images/mob1.png`}
              alt="Phone 2"
              className="absolute -right-20 w-[350px] rotate-6 -translate-x-28 sm:-translate-x-56 translate-y-8 sm:translate-y-16 z-20"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobilePage;
