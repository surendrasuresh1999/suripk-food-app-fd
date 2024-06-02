import React from "react";
import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const CommonPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <section>
            <Outlet />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CommonPage;
