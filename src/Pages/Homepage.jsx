import birthDay from "../../src/assets/birth-day.jpg";
import marriage from "../../src/assets/marriage.jpg";
import party from "../../src/assets/party.jpg";
import corporate from "../../src/assets/corporate.jpg";
import { Zoom, Slide, Roll, Hinge } from "react-awesome-reveal";

const Homepage = () => {
  return (
    <div className="space-y-12">
      hello world
      {/* service section */}
      <div className="full-bleed discover grid grid-cols-1 gap-10 rounded-md py-14 sm:px-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Zoom triggerOnce={true}>
            <h1 className="text-20size font-bold text-gray-800 sm:text-30size">
              Unforgettable Celebrations Await at <br />
              <b className="text-30size italic text-orange-500 sm:text-36size">
                Suri Restaurent
              </b>
            </h1>
          </Zoom>
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={birthDay}
                alt="service-img"
                className="hover:scale-120 h-full rounded-md transition ease-in-out"
              />
              <img
                src={marriage}
                alt="service-img"
                className="hover:scale-80 h-full rounded-md transition ease-in-out"
              />
              <img
                src={party}
                alt="service-img"
                className="hover:scale-80 h-full rounded-md transition ease-in-out"
              />
              <img
                src={corporate}
                alt="service-img"
                className="hover:scale-80 h-full rounded-md transition ease-in-out"
              />
            </div>
          </div>
          <Zoom triggerOnce={true}>
            <p className="text-justify text-18size font-medium text-gray-600">
              At Suri Restaurent, we specialize in creating memorable events
              tailored to your every need. Whether it's a{" "}
              <b>joyful birthday bash</b>, an intimate anniversary dinner, or a
              grand <b>wedding receptions</b> as well we are Providing{" "}
              <b>Corporate Party's</b> also, our team is dedicated to delivering
              exceptional experiences that exceed your expectations. From
              exquisite catering options to personalized décor and flawless
              service, let us turn your special occasions into cherished
              memories. Discover the perfect blend of elegance and culinary
              excellence at Suri Restaurent, where every celebration is crafted
              with care. and many more...
            </p>
          </Zoom>
          <button className="rounded-md bg-orange-400 px-4 py-3 font-semibold tracking-wide text-white">
            View More
          </button>
        </div>
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={birthDay}
              alt="service-img"
              className="hover:scale-120 h-full rounded-md transition ease-in-out"
            />
            <img
              src={marriage}
              alt="service-img"
              className="hover:scale-80 h-full rounded-md transition ease-in-out"
            />
            <img
              src={party}
              alt="service-img"
              className="hover:scale-80 h-full rounded-md transition ease-in-out"
            />
            <img
              src={corporate}
              alt="service-img"
              className="hover:scale-80 h-full rounded-md transition ease-in-out"
            />
          </div>
        </div>
      </div>
      {/* blogs section */}
      <div className="ms:px-4 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <img src={birthDay} alt="service-img" className="h-full rounded-md" />
          <img src={marriage} alt="service-img" className="h-full rounded-md" />
          <img src={party} alt="service-img" className="h-full rounded-md" />
          <img
            src={corporate}
            alt="service-img"
            className="h-full rounded-md"
          />
        </div>
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
          <button className="rounded-md bg-orange-400 px-4 py-3 font-semibold tracking-wide text-white">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
