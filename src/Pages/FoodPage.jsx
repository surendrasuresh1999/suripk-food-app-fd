import RestaurantCard from "../Components/RestaurantCard";
import { Baseurl } from "../BaseUrl";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import noDataImg from "../../src/assets/No data-pana (4).svg";

const FoodPage = () => {
  const [inputText, setInputText] = useState("");
  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();

  const getFoodItems = async () => {
    return await fetch(`${Baseurl.baseurl}/api/food`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["foodData"],
    queryFn: getFoodItems,
  });

  // Filtered food items based on input text
  const filteredFoodItems =
    inputText === ""
      ? data?.foodItems
      : data?.foodItems.filter((food) =>
          food.title.toLowerCase().includes(inputText.toLowerCase()),
        );

  return (
    <div className="space-y-14">
      <div className="realtive banner-img min-h-56 lg:min-h-96">
        <div className="flex min-h-56 max-w-4xl flex-col justify-center p-8 lg:min-h-96">
          <h1 className="text-xl font-bold text-white lg:text-6xl">
            Order your <br />
            favourite food here
          </h1>
          <p className="mt-10 max-w-2xl text-justify text-14size font-medium text-white lg:text-18size">
            Choose from a diverse featuring a delectable array of dishes crafted
            with the finest ingredients and culinary expertise. Our mission is
            to satisy your cravings and elevate your dining experience, one
            delicious meal at a time.
          </p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="text-20size font-bold tracking-wide text-gray-800 sm:text-32size">
            Top dishes for you
          </h1>
          <input
            type="text"
            placeholder="Search your favourite dish here..."
            className="rounded-md sm:min-w-72"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : data && data.status === 401 ? (
          navigate("/login")
        ) : filteredFoodItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div>
              <img
                src={noDataImg}
                alt="no-data"
                className="h-72 object-cover"
              />
            </div>
            <p className="col-span-full text-center text-18size text-gray-600">
              No dishes found on your <b className="text-20size">{inputText}</b>
            </p>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredFoodItems.map((food, index) => (
              <RestaurantCard foodObj={food} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FoodPage;
