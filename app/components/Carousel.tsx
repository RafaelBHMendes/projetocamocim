"use client";

import { useState } from "react";
import Image from "next/image";

import saaecamocim1 from "../../public/saaecamocim1.jpg";
import saeecamocim2 from "../../public/saeecamocim2.jpg";

import leftarrow from "../../public/leftarrow.svg";
import rightarrow from "../../public/rightarrow.svg";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [saaecamocim1, saeecamocim2];

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex justify-center items-center bg-cyan-100">
      <div className="overflow-hidden rounded-lg h-50 w-50">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          layout="cover"
        />
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 px-2 py-1  text-white rounded-full "
        onClick={goToPreviousSlide}
      >
        <Image src={leftarrow} alt={"esquerda"} width={50} height={50} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1  text-white rounded-full "
        onClick={goToNextSlide}
      >
        <Image src={rightarrow} alt={"direita"} width={50} height={50} />
      </button>
    </div>
  );
};

export default Carousel;
