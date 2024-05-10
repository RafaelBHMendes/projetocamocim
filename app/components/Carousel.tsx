"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import saaecamocim1 from "../../public/saaecamocim1.jpg";
import saaecamocim2 from "../../public/saeecamocim2.jpg";
import leftarrow from "../../public/leftarrow.svg";
import rightarrow from "../../public/rightarrow.svg";

type ImageItem = {
  src: StaticImageData;
  alt: string;
};

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right"
  >("right");

  const images: ImageItem[] = [
    { src: saaecamocim1, alt: "Imagem 1" },
    { src: saaecamocim2, alt: "Imagem 2" },
  ];

  const goToPreviousSlide = () => {
    setAnimationDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setAnimationDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Aplica classes condicionalmente com base na direção da animação
  const slideDirectionClasses =
    animationDirection === "right" ? "translate-x-0" : "-translate-x-0";

  return (
    <div className="relative flex justify-center items-center bg-cyan-50">
      <div className="overflow-hidden rounded-lg h-[500px] w-[1200px] relative">
        {images.map((image, index) => (
          <Image
            key={image.src.src}
            src={image.src}
            alt={image.alt}
            fill
            objectFit="cover"
            priority={currentIndex === 0}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              currentIndex === index
                ? slideDirectionClasses
                : "translate-x-full"
            }`}
          />
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 px-2 py-1 text-white  rounded-full"
        onClick={goToPreviousSlide}
        aria-label="Previous slide"
      >
        <Image src={leftarrow} alt="Left Arrow" width={50} height={50} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 text-white  rounded-full"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <Image src={rightarrow} alt="Right Arrow" width={50} height={50} />
      </button>
      <div className="absolute bottom-5 w-full flex justify-center">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-3 w-3 mx-1 rounded-full ${
              currentIndex === idx ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
