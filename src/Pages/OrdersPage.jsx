import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Rating } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import dayjs from "dayjs";
import { IndianRupee, Loader2Icon } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import emptyOrderImg from "../../src/assets/Order food-pana.svg";
import { Link, useNavigate } from "react-router-dom";
import preparingFoodImg from "../../src/assets/cooking.png";
import pickUpImg from "../../src/assets/delivery-boy.png";
import delivered from "../../src/assets/delivered.png";
import confirmed from "../../src/assets/booking.png";
import clock from "../../src/assets/clock.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const OrdersPage = () => {
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const getOrderItems = async () => {
    return await fetch(`${Baseurl.baseurl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ordersData"],
    queryFn: getOrderItems,
  });

  const renderStatus = (action) => {
    const imgString =
      action === "Pending"
        ? clock
        : action === "Processing"
          ? preparingFoodImg
          : action === "Confirmed"
            ? confirmed
            : action === "Out for Delivery"
              ? pickUpImg
              : delivered;
    return (
      <div className="flex items-center gap-2">
        <span
          className={`text-12size font-semibold sm:text-14size ${action === "Pending" ? "text-gray-500" : action === "Confirmed" ? "text-indigo-500" : action === "Processing" ? "text-slate-700" : action === "Out for Delivery" ? "text-orange-400" : "text-green-600"}`}
        >
          {action}
        </span>
        <img src={imgString} alt="preparing-food" className="h-6 w-6" />
      </div>
    );
  };

  const handleDropRating = (orderId, itemId, rating) => {
    setShowLoader(true);
    axios
      .put(
        `${Baseurl.baseurl}/api/orders/${orderId}/${itemId}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      .then((res) => {
        if (res.status) {
          queryClient.invalidateQueries("ordersData");
          toast.success(res.data.message);
          setShowLoader(false);
        } else {
          toast.error(res.data.message);
          setShowLoader(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setShowLoader(false);
      });
  };

  return (
    <div>
      {data?.orders?.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order history
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-16size">
            Check the status of recent orders, delivered orders, and many
            more...
          </p>
        </div>
      )}

      <div className={data?.orders?.length > 0 && "mt-6 sm:mt-12"}>
        <h2 className="sr-only">Recent orders</h2>
        <div>
          {isPending ? (
            <Loader />
          ) : error ? (
            <ConnectionLost />
          ) : data && data.status === 401 ? (
            navigate("/login")
          ) : data.orders?.length > 0 ? (
            <ul className="space-y-8">
              {data.orders?.map((order, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-b border-t border-gray-200 bg-white shadow-sm"
                >
                  <h3 className="sr-only">
                    Order placed on{" "}
                    <time dateTime={order.createdAt}>
                      {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </time>
                  </h3>

                  <div className="border-b border-gray-200 p-3 sm:p-4">
                    <dl className="grid grid-cols-12 space-y-3 sm:gap-x-4 sm:space-y-0">
                      <div className="col-span-12 sm:col-span-4">
                        <dt className="text-14size font-medium text-gray-900 sm:text-16size">
                          Order number
                        </dt>
                        <dd className="mt-1 text-14size text-gray-500 sm:text-16size">
                          {order.paymentInfo.orderId}
                        </dd>
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <dt className="text-14size font-medium text-gray-900 sm:text-16size">
                          Date placed
                        </dt>
                        <dd className="mt-1 text-14size text-gray-500 sm:text-16size">
                          <time dateTime={order.createdDatetime}>
                            {dayjs(order.createdAt).format(
                              "DD/MM/YYYY HH:mm:ss",
                            )}
                          </time>
                        </dd>
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <dt className="text-14size font-medium text-gray-900 sm:text-16size">
                          Total amount
                        </dt>
                        <dd className="mt-1 flex items-center gap-1 text-14size font-medium text-gray-500 sm:text-16size">
                          <span className="flex items-center">
                            {" "}
                            <IndianRupee
                              size={13}
                              className="mt-1 font-semibold"
                            />
                            {order.totalAmount || 0} (Include taxes)
                          </span>

                          <Tooltip
                            title="inclusive shipping fee and GST fee"
                            arrow
                          >
                            <QuestionMarkCircleIcon className="mt-1 h-5 w-5 text-gray-500" />
                          </Tooltip>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                    {order.orderItems.map((product, index) => (
                      <li key={index} className="p-3 sm:p-6">
                        <div className="flex items-start">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              src={product.imageUrl}
                              alt="item image"
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-3 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5 className="text-14size sm:text-18size">
                                {product.title}
                              </h5>
                              <p className="mt-1 flex items-center sm:mt-0">
                                Total amount:
                                <IndianRupee
                                  size={13}
                                  className="mt-1 font-semibold"
                                />
                                {product.price * product.quantity}
                              </p>
                            </div>
                            <p className="text-gray-500 sm:mt-2">
                              Quantity: {product.quantity}
                            </p>
                            <p className="text-gray-500 sm:mt-2">
                              Price: {product.price}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
                          <div className="flex items-center">
                            <p className="flex items-center gap-2 font-bold text-gray-500 sm:mt-1">
                              Status:{renderStatus(order.status)}
                            </p>
                          </div>
                          {order.status === "Delivered" &&
                            (showLoader ? (
                              <Loader2Icon
                                className="animate-spin text-gray-700"
                                size={16}
                              />
                            ) : (
                              <Rating
                                name="half-rating"
                                size="small"
                                precision={0.5}
                                readOnly={
                                  order.ratingArr[index]?.foodId === product._id
                                }
                                value={
                                  order.ratingArr[index]?.foodId === product._id
                                    ? order.ratingArr[index]?.value
                                    : 0
                                }
                                onChange={(event, newValue) => {
                                  handleDropRating(
                                    order._id,
                                    product._id,
                                    newValue,
                                  );
                                }}
                              />
                            ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <img src={emptyOrderImg} alt="cart-empty-img" className="h-64" />
              <h1 className="text-center text-18size font-bold tracking-wide text-gray-900 sm:text-28size">
                Sorry you haven't ordered anything yet
              </h1>
              <p className="text-14size font-normal text-gray-400 sm:text-18size">
                If you are hungry just order right now <br /> and get your food
                less than 5minutes.
              </p>
              <Link
                to={"/all-food"}
                className="min-w-52 rounded-md bg-orange-400 px-3 py-2 text-center text-14size font-semibold tracking-wide text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Order now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
