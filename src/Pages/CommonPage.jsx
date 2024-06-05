import React from "react";
import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const CommonPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col min-h-screen relative">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <main className="grow mx-auto container p-6 lg:px-8">
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
