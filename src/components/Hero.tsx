import React from "react";

const Hero = ({heroImage, heroTitle}) => {
  console.log(heroImage, heroTitle)
  return (
    <div className="relative bg-gray-800 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative container mx-auto py-32 text-center">
        <h1 className="text-5xl font-bold mb-4">{heroTitle}</h1>
        <button className="mt-8 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          Share This
        </button>
      </div>
    </div>
  );
};

export default Hero;
