import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/Footer";
import MapView from "./components/MapView";
import Carousel from "./components/Carousel";
import Notices from "./components/Notices";

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

        <Carousel />
        <Notices />
        <MapView />
        <Footer />
      </div>
    </>
  );
}
