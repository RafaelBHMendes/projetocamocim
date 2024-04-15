import Image from "next/image";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import underconstruction from "../public/underconstruction.svg";

export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col">
        <Header />
        <div className="relative flex justify-center items-center h-screen">
          {/* Background image with absolute positioning */}
          <Image
            src={underconstruction}
            alt="Banner de em construção"
            fill
            objectFit="cover"
            quality={100}
            className="z-0" // Ensure the image is behind the text
          />
          {/* Text overlay with relative positioning to bring it above the image */}
          <h1 className="text-4xl font-bold text-center text-black relative z-10">
            Site em Construção
          </h1>
        </div>
      </div>
    </>
  );
}
