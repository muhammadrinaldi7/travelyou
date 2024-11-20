"use client";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

interface ImageSliderProps {
  images: string[]; // Daftar URL gambar
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <Image
        width={1000}
        height={1000}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
      />
      <FontAwesomeIcon
        icon={faChevronCircleLeft}
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform size-6 -translate-y-1/2 text-white"
      />
      <FontAwesomeIcon
        icon={faChevronCircleRight}
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform size-6 -translate-y-1/2 text-white"
      />
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &#10094; {/* Simbol panah kiri */}
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 focus:outline-none"
      >
        &#10095; {/* Simbol panah kanan */}
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
