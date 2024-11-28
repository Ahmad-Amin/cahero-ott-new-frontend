import React from "react";

const MobilePage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center overflow-hidden">
      <div className="w-full h-screen flex flex-col items-center bg-black">
        {/* Header */}
        <header className="w-full flex justify-center items-center px-4 py-3">
          <img src="/Images/Logo.png" alt="Logo" className="h-16 sm:h-20" />
        </header>

        {/* Main Content */}
        <main className="flex flex-col h-full items-center text-center mt-2 w-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
            Get <span className="text-purple-500">Alfonso Cahero</span> on{" "}
            <br />
            Your Mobile
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-3 sm:mt-4 w-10/12 z-50">
            Download our app to experience all the features and enjoy seamless
            access anytime, anywhere
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-6 z-20">
            <button className="bg-white text-black px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center text-sm sm:text-base">
              <img
                src={`/Images/apple.png`}
                alt="Apple"
                className="w-5 sm:w-6 h-5 sm:h-6 mr-2"
              />
              App Store
            </button>
            <button className="bg-white text-black px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center text-sm sm:text-base">
              <img
                src={`/Images/playstore.png`}
                alt="Google Play"
                className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
              />
              Google Play
            </button>
          </div>

          {/* Images Section */}
          <div className="relative mt-6 sm:mt-10 flex items-center justify-center w-full h-full">
            {/* Background Images */}
            <img
              src={`/Images/bg1.png`}
              alt="bg 1"
              className="absolute bottom-0 w-full sm:-bottom-72"
            />
            <img
              src={`/Images/bg2.png`}
              alt="bg 2"
              className="absolute bottom-0 w-full sm:-bottom-72"
            />

            {/* Phones */}
            <img
              src={`/Images/mobile-group.png`}
              alt="Phone 1"
              className="absolute w-[350px] left-1/2 transform -translate-x-1/2 z-10"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobilePage;
