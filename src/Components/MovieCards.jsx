import React, {useState} from 'react'

const MovieCards = () => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div
    className="relative w-80 h-56 hover:h-96 m-4  cursor-pointer bg-black rounded-lg shadow-lg"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {/* Static Image */}
    <img
      src="https://via.placeholder.com/200x300"
      alt="Movie Poster"
      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
        isHovered ? "scale-105" : "scale-100"
      }`}
    />

    {/* Dynamic Label */}
    {!isHovered && (
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold py-1 px-2 rounded-md">
        New Episodes
      </div>
    )}

    {/* Hover Content */}
    {isHovered && (
      <div className="absolute inset-0 bg-black bg-opacity-90 p-4 flex flex-col justify-between text-white transition-opacity duration-300">
        {/* Thumbnail and Title */}
        <div>
          <img
            src="https://via.placeholder.com/200x150"
            alt="Movie Thumbnail"
            className="w-full h-56 object-cover rounded"
          />
          <h3 className="text-lg font-bold mb-1">
            Puss in Boots: The Last Wish
          </h3>
          <div className="text-sm text-gray-400">8 Episodes • HD</div>
          <div className="text-sm text-gray-400 mt-1">16+ | Exciting | Horror</div>
        </div>

        {/* Buttons */}
        <div className="flex justify-around mt-4">
          <button className="w-10 h-10 flex justify-center items-center bg-white rounded-full text-black shadow-lg">
            <span className="material-icons">play_arrow</span>
          </button>
          <button className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full text-white shadow-lg">
            <span className="material-icons">add</span>
          </button>
          <button className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full text-white shadow-lg">
            <span className="material-icons">thumb_up</span>
          </button>
        </div>
      </div>
    )}
  </div>

  )
}

export default MovieCards
