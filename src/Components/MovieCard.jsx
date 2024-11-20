import React from "react";

const MovieCard = ({ title, description, image }) => {
  return (
    <div className="group relative w-64 h-96 bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer">
      {/* Movie Poster */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      {/* Hover Details */}
      <div className="absolute inset-0 bg-black bg-opacity-70 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        
        {/* Action Icons */}
        <div className="absolute bottom-4 left-4 flex space-x-4">
          <button className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700">
            <i className="fas fa-play"></i> {/* Play Icon */}
          </button>
          <button className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-700">
            <i className="fas fa-heart"></i> {/* Like Icon */}
          </button>
          <button className="text-white bg-gray-600 p-2 rounded-full hover:bg-gray-700">
            <i className="fas fa-info-circle"></i> {/* Info Icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
