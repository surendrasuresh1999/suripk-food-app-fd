import React, { useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import AddressDialog from "../Components/AddressDialog";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  Ban,
  BriefcaseBusiness,
  CircleUser,
  Home,
  Hotel,
  IndianRupee,
  Loader2Icon,
  MapPin,
  Phone,
} from "lucide-react";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import noAddress from "../../src/assets/Address-pana (1).svg";
import { Link, useNavigate } from "react-router-dom";

const icon = {
  Hotel: <Hotel size={20} />,
  Work: <BriefcaseBusiness size={20} />,
  Home: <Home size={20} />,
  Other: <Ban size={20} />,
  User: <CircleUser size={20} />,
  Contact: <Phone size={20} />,
  Address: <MapPin size={20} />,
};

const CheckoutPage = () => {
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  // const getUserAddressess = async () => {
  //   return await fetch(`${Baseurl.baseurl}/api/address`, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`,
  //     },
  //   }).then((res) => res.json());
  // };

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["addressData"],
  //   queryFn: getUserAddressess,
  // });

  const getCartFoodItems = async () => {
    return await fetch(`${Baseurl.baseurl}/api/cart/all`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["cartData"],
    queryFn: getCartFoodItems,
  });

  const handleFormSubmit = (values, actions) => {
    axios
      .post(`${Baseurl.baseurl}/api/address`, values, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          actions.setSubmitting(false);
          actions.resetForm();
          setOpenAddressDialog(false);
          queryClient.invalidateQueries("addressData");
        } else {
          toast.error(res.data.message);
          console.log("res", res);
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
        actions.setSubmitting(false);
      });
  };

  const handleDeleteAddress = (addressId) => {
    axios
      .delete(`${Baseurl.baseurl}/api/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("addressData");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handlePaymentRequest = async (totalAmount) => {
    setShowLoader(true);
    // Step 1: get razor pay key
    const { keyString } = await axios
      .get(`${Baseurl.baseurl}/api/getKey`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status) {
          return res.data;
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // Step 2: Create order
    const { order } = await axios
      .post(
        `${Baseurl.baseurl}/api/checkout`,
        { totalAmount },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          return res.data;
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // Step 3: Configure Razorpay options
    const options = {
      keyString,
      amount: order.amount,
      currency: "INR",
      name: "JSP Restaurent",
      description: "Thank you for using our service for food orders",
      image:
        "https://drive.google.com/file/d/19uNKpxEtrmQF7FiGkIK2TzP_pcTIWnd4/view?usp=drive_link",
      order_id: order.id,
      handler: async function (response) {
        await axios
          .post(
            `${Baseurl.baseurl}/api/payment-verification`,
            {
              response,
              items: data?.cart?.foodItems,
              rating: data?.cart?.ratingArr,
              addressId: "666d444948c22de00e208982",
              totalAmount: order.amount,
            },
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            },
          )
          .then((res) => {
            if (res.data.status) {
              toast.success(res.data.message);
              navigate("/my-orders");
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      },
      prefill: {
        name: "Surendra PK",
        email: "example@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#160442",
      },
    };
    setShowLoader(false);
    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      toast.error(
        "Sorry your payment is failed",
        response.error.reason,
        response.error.description,
      );
    });
    razor.open();
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Choose delivery address
              </h2>
              <button
                type="button"
                onClick={() => setOpenAddressDialog(true)}
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md border border-orange-400 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 shadow-sm hover:bg-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Add new address
                <PlusCircleIcon className="-mr-0.5 h-5 w-5 text-orange-700" />
              </button>
            </div>
            <div>
              {isPending ? (
                <Loader />
              ) : error ? (
                <ConnectionLost />
              ) : data.address.length > 0 ? (
                <ul>
                  {data.address.map((data, i) => (
                    <li
                      key={i}
                      className="relative mt-4 flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm"
                    >
                      <input
                        id={i}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500"
                        checked={data._id === selectedAddressId}
                        onChange={() => setSelectedAddressId(data._id)}
                      />
                      <div className="space-y-1">
                        <h1 className="flex items-center gap-2">
                          {icon.User}
                          <span className="truncate text-14size font-bold tracking-wide text-gray-900">
                            {data.receiversName}
                          </span>
                          <button
                            onClick={() => handleDeleteAddress(data._id)}
                            className="ml-2"
                          >
                            <TrashIcon className="absolute right-2 top-3 h-5 w-5 text-gray-700" />
                          </button>
                        </h1>
                        <p className="flex items-center gap-2">
                          {icon[data.addressType]}
                          <span className="text-14size font-bold tracking-wide text-gray-900">
                            {data.addressType}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          {icon.Contact}
                          <span className="text-14size font-medium tracking-wide text-gray-900">
                            {data.receiversContact}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          {icon.Address}
                          <span className="text-14size font-medium tracking-wide text-gray-900">
                            {data.areaSector}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white pb-8">
                  <img src={noAddress} alt="cart-empty-img" className="h-44" />
                  <h1 className="text-18size font-bold tracking-wide text-gray-900 sm:text-28size">
                    No Saved Addresses Found
                  </h1>
                  <p className="px-1 text-center text-14size font-normal text-gray-600 sm:text-18size">
                    Oops! It seems like you haven't added your address yet. Add
                    your address to proceed and explore our delicious offerings.
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpenAddressDialog(true)}
                    className="inline-flex items-center justify-center gap-x-1.5 rounded-md border border-orange-400 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 shadow-sm hover:bg-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                  >
                    Add new address
                    <PlusCircleIcon className="-mr-0.5 h-5 w-5 text-orange-700" />
                  </button>
                </div>
              )}
            </div>
          </div> */}

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list">
                {data?.cart?.foodItems.map((product, productIdx) => (
                  <li
                    key={productIdx}
                    className={`${productIdx === data.cart.foodItems.length - 1 ? "" : "border-b"} p-2`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageUrl}
                          alt="food-image"
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-36 sm:w-36"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <h3 className="text-wrap break-words text-14size font-semibold sm:text-16size">
                              {product.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Quantity:{" "}
                              <b className="text-sm">{product.quantity}</b>
                            </p>
                            <p className="mt-1 flex items-center text-sm font-medium text-gray-900">
                              <IndianRupee
                                size={13}
                                className="mt-1 font-semibold"
                              />
                              {product.price * product.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {data?.cart?.totalPrice}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {data?.cart?.shippingFee}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {data?.cart?.taxEstimate}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="flex items-center gap-1 text-base font-medium text-gray-900">
                    <IndianRupee size={13} className="mt-1 font-semibold" />
                    {data?.cart?.totalPrice +
                      data?.cart?.shippingFee +
                      data?.cart?.taxEstimate}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  onClick={() =>
                    handlePaymentRequest(
                      data.cart.totalPrice +
                        data.cart.shippingFee +
                        data.cart.taxEstimate,
                    )
                  }
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  {showLoader ? (
                    <Loader2Icon className="animate-spin" size={23} />
                  ) : (
                    "Place order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAddressDialog && (
        <AddressDialog
          open={openAddressDialog}
          setter={setOpenAddressDialog}
          handler={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
