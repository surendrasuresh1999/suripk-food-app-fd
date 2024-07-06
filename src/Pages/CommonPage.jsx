import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../common/Footer";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { CartContextProvider } from "../context/CartContext";

const CommonPage = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <CartContextProvider>
      <div className="min-h-screen scroll-smooth bg-slate-50">
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 shrink-0 bg-white shadow">
            <Navbar />
          </header>
          <main
            className={`container mx-auto grow ${location.pathname !== "/" ? "p-6 lg:px-8" : ""}`}
          >
            <section>
              <Outlet />
            </section>
          </main>
          <Footer />
        </div>
        {showScrollToTop && (
          <button
            className="group fixed bottom-4 right-2 animate-bounce rounded-full border border-indigo-500 bg-indigo-200 p-2.5 hover:bg-indigo-200"
            onClick={scrollToTop}
          >
            <ChevronUpIcon className="h-6 w-6 text-indigo-700 group-hover:text-indigo-900" />
          </button>
        )}
      </div>
    </CartContextProvider>
  );
};

export default CommonPage;
