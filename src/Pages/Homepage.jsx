import foodBlog from "../../src/assets/food-blog.jpg";
import { Slide } from "react-awesome-reveal";
import { files, menuItems, serviceImages, testimonials } from "../StaticData";
import useEmblaCarousel from "embla-carousel-react";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";

const tabsData = ["Appetizers", "Main Courses", "Desserts", "Beverages"];
const Homepage = () => {
  const navigate = useNavigate();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [emblaRefTop, emblaApiTop] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideTop, setCurrentSlideTop] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const nextSlide = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setCurrentSlide(emblaApi.selectedScrollSnap()); // Update current slide index
    }
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setCurrentSlide(emblaApi.selectedScrollSnap()); // Update current slide index
    }
  };
  const nextSlideTop = () => {
    if (emblaApiTop) {
      emblaApiTop.scrollNext();
      setCurrentSlideTop(emblaApiTop.selectedScrollSnap()); // Update current slide index
    }
  };

  // Function to move to the previous slide
  const prevSlideTop = () => {
    if (emblaApiTop) {
      emblaApiTop.scrollPrev();
      setCurrentSlideTop(emblaApiTop.selectedScrollSnap()); // Update current slide index
    }
  };

  return (
    <div className="space-y-12">
      {/* banner section */}
      <div>hello world</div>
      {/* menu section */}
      <div className="space-y-8">
        <h1 className="text-center text-20size font-bold text-gray-500 sm:text-34size">
          Check Our Tasty Menu
        </h1>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-8">
          {tabsData.map((tab, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`rounded-md border ${activeTab === i ? "border-orange-700 bg-orange-100 text-orange-500 hover:bg-orange-200" : "bg-white text-gray-600 hover:bg-slate-50"} px-6 py-3 text-12size font-semibold sm:text-16size`}
            >
              {tab}
            </button>
          ))}
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {menuItems[activeTab].items.map((menu, i) => (
            <li
              key={i}
              onClick={() => navigate("/all-food")}
              className="food-card relative cursor-pointer overflow-hidden rounded-md bg-white"
            >
              <div className="aspect-h-7 aspect-w-10 group block w-full overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt="item-img"
                  src={menu.img}
                  className="h-52 w-full object-cover"
                />
              </div>
              <div className="p-2">
                <p className="mt-2 block truncate text-18size font-medium text-gray-900">
                  {menu.name}
                </p>
                <p className="block truncate text-14size font-medium text-gray-500">
                  {menu.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* service section */}
      <div className="full-bleed discover space-y-6 py-14 sm:px-4">
        <div>
          <h1 className="text-center text-20size font-bold text-gray-500 sm:text-34size">
            Organize your Events at our Restaurant
          </h1>
        </div>
        <div className="embla relative py-6" ref={emblaRefTop}>
          <div className="embla__container">
            {serviceImages.map((service, index) => (
              <div className="embla__slide2" key={index}>
                <div className="grid grid-cols-1 gap-10 px-2 lg:grid-cols-2">
                  <img
                    src={service.img}
                    alt="service-img"
                    className="h-full rounded-md"
                  />
                  <div className="space-y-3">
                    <h1 className="text-22size font-bold text-gray-800 sm:text-32size">
                      {service.title}{" "}
                      {/* <b className="text-30size italic text-orange-500 sm:text-36size">
                          Suri Restaurant
                        </b> */}
                    </h1>

                    <p className="text-justify text-18size font-medium text-gray-700">
                      {service.content}
                    </p>

                    <Link
                      to={"/services"}
                      className="inline-block rounded-md bg-orange-400 px-4 py-3 font-semibold tracking-wide text-white"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 right-0 flex items-center gap-4">
            <button
              className="rounded-full border border-gray-600 p-3 text-white"
              onClick={prevSlideTop}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="rounded-full border border-gray-600 p-3 text-white"
              onClick={nextSlideTop}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* blogs section */}
      <div className="ms:px-4 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <Slide triggerOnce={true} direction="up">
            <h1 className="text-22size font-bold text-gray-800 sm:text-32size">
              Discover Culinary Creations: Latest{" "}
              <b className="text-30size italic text-orange-500 sm:text-36size">
                Recipes and Food Adventures
              </b>
            </h1>

            <p className="text-justify text-18size font-medium text-gray-700">
              Welcome to our culinary hub where we share the latest recipes,
              cooking tips, and food adventures straight from our kitchen to
              your table. Dive into a world of flavors with our curated
              collection of recipes crafted by our talented chefs. From
              mouth-watering appetizers to decadent desserts, our blog is your
              go-to destination for culinary inspiration. Whether you're a
              seasoned home chef or a food enthusiast looking to explore new
              tastes, join us on a delicious journey through our recipes and
              culinary insights. Stay tuned for regular updates and let your
              taste buds savor every bite of our culinary creations.
            </p>
          </Slide>
          <Link
            to={"/blogs"}
            className="inline-block rounded-md bg-orange-400 px-4 py-3 font-semibold tracking-wide text-white"
          >
            View More
          </Link>
        </div>
        <img src={foodBlog} alt="service-img" className="h-full rounded-md" />
      </div>
      {/* testimonials */}
      <div className="relative isolate overflow-hidden rounded-md bg-white shadow">
        <h1 className="py-6 text-center text-20size font-bold text-gray-500 sm:text-34size">
          Customer Testimonials
        </h1>
        <div className="relative mx-auto max-w-2xl py-16 lg:max-w-4xl">
          <div className="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
          <div className="embla relative py-2" ref={emblaRef}>
            <div className="embla__container p-2">
              {testimonials.map((testmonial, index) => (
                <div className="embla__slide" key={index}>
                  <figure className="grid grid-cols-1 items-start gap-x-6 gap-y-8 lg:gap-x-10">
                    <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
                      <svg
                        fill="none"
                        viewBox="0 0 162 128"
                        aria-hidden="true"
                        className="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10"
                      >
                        <path
                          d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                          id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                        />
                        <use
                          x={86}
                          href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                        />
                      </svg>
                      <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                        <p className="text-justify">{testmonial.quote}</p>
                      </blockquote>
                    </div>
                    <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
                      <img
                        alt=""
                        src={testmonial.img}
                        className="rounded-xl bg-indigo-50 lg:rounded-2xl"
                      />
                    </div>
                    <figcaption className="text-base lg:col-start-1 lg:row-start-3">
                      <div className="font-semibold text-gray-900">
                        {testmonial.name}
                      </div>
                      <div className="mt-1 text-gray-500">
                        {testmonial.location}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-5 right-8 flex items-center gap-4">
            <button
              className="z-20 -translate-y-1/2 transform rounded-full border border-gray-600 p-3 text-white"
              onClick={prevSlide}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="z-20 -translate-y-1/2 transform rounded-full border border-gray-600 p-3 text-white"
              onClick={nextSlide}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
