import React, { useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { Link, Navigate } from "react-router-dom";
import emptyCart from "../../src/assets/Add to Cart-amico.svg";
import { IndianRupee } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import numberToWords from "number-to-words";

const CartPage = () => {
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();
  const taxMoney = { shippingFee: 5, taxFee: 5 };

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

  const handleDeleteItem = (itemId) => {
    axios
      .delete(`${Baseurl.baseurl}/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("cartData");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleIncreaseQuantity = (productId) => {
    axios
      .put(`${Baseurl.baseurl}/api/cart/increase/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("cartData");
        } else {
          console.log(res.data.message);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        console.log("eeasdfa suuny");
      });
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      axios
        .put(`${Baseurl.baseurl}/api/cart/decrease/${productId}`, null, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          if (res.status) {
            toast.success(res.data.message);
            queryClient.invalidateQueries("cartData");
          } else {
            console.log(res.data.message);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("eeasdfa suuny");
        });
    } else {
      toast.error("You can't decrease below 1");
    }
  };

  return (
    <div className="rounded-md bg-white pb-5 shadow-md">
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : data && data.status === 401 ? (
        <Navigate to={"/login"} state={{ from: location }} replace />
      ) : data.cart.foodItems.length > 0 ? (
        <div>
          <h1 className="border-b p-4 text-3xl font-bold tracking-tight text-gray-900 sm:p-6 sm:text-4xl">
            All Food items
          </h1>
          <div className="mt-6 p-4 sm:p-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="space-y-2">
                {data.cart.foodItems.map((product, productIdx) => (
                  <li
                    key={productIdx}
                    className={`${productIdx === data.cart.foodItems.length - 1 ? "" : "border-b"} pb-2`}
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
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
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
                          {/* from tab device view */}
                          <div className="mt-4 hidden sm:mt-0 sm:block sm:pr-9">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  handleDecreaseQuantity(
                                    product._id,
                                    product.quantity,
                                  )
                                }
                                className="rounded border p-1 shadow"
                              >
                                <MinusIcon className="h-4 w-4 text-gray-700" />
                              </button>
                              <span className="text-16size font-bold tracking-wide text-black">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleIncreaseQuantity(product._id)
                                }
                                className="rounded border p-1 shadow"
                              >
                                <PlusIcon className="h-4 w-4 text-gray-700" />
                              </button>
                            </div>
                            <div className="absolute right-0 top-0">
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(product._id)}
                                className="-m-2 inline-flex p-1 text-gray-400 hover:text-gray-500"
                              >
                                <TrashIcon className="h-5 w-5 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* mobile view */}
                    <div className="xs:block flex items-center justify-between py-3 sm:hidden">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(
                              product._id,
                              product.quantity,
                            )
                          }
                          className="rounded border p-1 shadow"
                        >
                          <MinusIcon className="h-4 w-4 text-gray-700" />
                        </button>
                        <span className="text-14size font-bold tracking-wide text-black">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => handleIncreaseQuantity(product._id)}
                          className="rounded border p-1 shadow"
                        >
                          <PlusIcon className="h-4 w-4 text-gray-700" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(product._id)}
                        className="-m-2 flex items-center p-1"
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 shadow sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {data.cart.totalPrice}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {taxMoney.shippingFee}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {taxMoney.taxFee}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="flex items-center text-base font-medium text-gray-900">
                    <IndianRupee size={13} className="mt-1 font-semibold" />
                    {data.cart.totalPrice +
                      taxMoney.taxFee +
                      taxMoney.shippingFee}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold sm:text-14size">
                    **
                    {numberToWords.toWords(
                      data.cart.totalPrice +
                        taxMoney.taxFee +
                        taxMoney.shippingFee,
                    )}{" "}
                    rupees only/-
                  </span>
                </div>
              </dl>

              <div className="mt-6">
                <Link
                  to={"/checkout"}
                  className="inline-block w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </Link>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <img src={emptyCart} alt="cart-empty-img" className="h-80" />
          <h1 className="text-18size font-bold tracking-wide text-gray-900 sm:text-28size">
            Your food cart is empty now
          </h1>
          <p className="text-14size font-normal text-gray-400 sm:text-18size">
            If you are hungry just order right now <br /> and get your food less
            than 5minutes.
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
  );
};

export default CartPage;
