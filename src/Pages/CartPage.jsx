import React from "react";
import {
  MinusIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { Link, Navigate } from "react-router-dom";
import emptyCart from "../../src/assets/Add to Cart-amico.svg";
import { IndianRupee } from "lucide-react";
import numberToWords from "number-to-words";
import { CartData } from "../context/CartContext";
import CartItemCard from "../Components/CartItemCard";

const CartPage = () => {
  const { cartData, isPending, error, updateCartItem, removeCartItem } =
    CartData();

  const handleDeleteItem = async (itemId) => {
    await removeCartItem(itemId);
  };

  const handleIncreaseQuantity = async (action, productId, data) => {
    await updateCartItem(action, productId, data);
  };

  const handleDecreaseQuantity = async (action, productId, data) => {
    await updateCartItem(action, productId, data);
  };

  return (
    <div className="pb-5">
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : cartData.cart && cartData.cart.status === 401 ? (
        <Navigate to={"/login"} state={{ from: location }} replace />
      ) : cartData.cart.foodItems.length > 0 ? (
        <div>
          <h1 className="border-b p-4 text-2xl font-bold tracking-tight text-gray-900 sm:p-6 sm:text-4xl">
            All Food items
          </h1>
          <div className="mt-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="space-y-3">
                {cartData.cart.foodItems.map((product, productIdx) => (
                  // <li
                  //   key={productIdx}
                  //   className={`food-card rounded-md bg-white p-2.5 pb-2`}
                  // >
                  //   <div className="flex">
                  //     <div className="flex-shrink-0">
                  //       <img
                  //         src={product.imageUrl}
                  //         alt="food-image"
                  //         className="h-24 w-24 rounded-md object-cover object-center sm:h-36 sm:w-36"
                  //       />
                  //     </div>
                  //     <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  //       <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  //         <div>
                  //           <h3 className="text-wrap break-words text-14size font-semibold sm:text-16size">
                  //             {product.title}
                  //           </h3>
                  //           <p className="text-xs text-gray-500">
                  //             Quantity:{" "}
                  //             <b className="text-sm">{product.quantity}</b>
                  //           </p>
                  //           <p className="mt-1 flex items-center text-sm font-medium text-gray-900">
                  //             <IndianRupee
                  //               size={13}
                  //               className="mt-1 font-semibold"
                  //             />
                  //             {product.price * product.quantity}
                  //           </p>
                  //         </div>
                  //         {/* from tab device view */}
                  //         <div className="mt-4 hidden sm:mt-0 sm:block sm:pr-9">
                  //           <div className="flex items-center gap-3">
                  //             <button
                  //               onClick={() =>
                  //                 handleDecreaseQuantity(
                  //                   "decrease",
                  //                   product._id,
                  //                   product.quantity,
                  //                 )
                  //               }
                  //               className="rounded border p-1 shadow"
                  //             >
                  //               <MinusIcon className="h-4 w-4 text-gray-700" />
                  //             </button>
                  //             <span className="text-16size font-bold tracking-wide text-black">
                  //               {product.quantity}
                  //             </span>
                  //             <button
                  //               onClick={() =>
                  //                 handleIncreaseQuantity(
                  //                   "increase",
                  //                   product._id,
                  //                   null,
                  //                 )
                  //               }
                  //               className="rounded border p-1 shadow"
                  //             >
                  //               <PlusIcon className="h-4 w-4 text-gray-700" />
                  //             </button>
                  //           </div>
                  //           <div className="absolute right-0 top-0">
                  //             <button
                  //               type="button"
                  //               onClick={() => handleDeleteItem(product._id)}
                  //               className="-m-2 inline-flex p-1 text-gray-400 hover:text-gray-500"
                  //             >
                  //               <TrashIcon className="h-5 w-5 text-red-500" />
                  //             </button>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  //   {/* mobile view */}
                  //   <div className="xs:block flex items-center justify-between py-3 sm:hidden">
                  //     <div className="flex items-center gap-3">
                  //       <button
                  //         onClick={() =>
                  //           handleDecreaseQuantity(
                  //             "decrease",
                  //             product._id,
                  //             product.quantity,
                  //           )
                  //         }
                  //         className="rounded border p-1 shadow"
                  //       >
                  //         <MinusIcon className="h-4 w-4 text-gray-700" />
                  //       </button>
                  //       <span className="text-14size font-bold tracking-wide text-black">
                  //         {product.quantity}
                  //       </span>
                  //       <button
                  //         onClick={() =>
                  //           handleIncreaseQuantity(
                  //             "increase",
                  //             product._id,
                  //             null,
                  //           )
                  //         }
                  //         className="rounded border p-1 shadow"
                  //       >
                  //         <PlusIcon className="h-4 w-4 text-gray-700" />
                  //       </button>
                  //     </div>
                  //     <button
                  //       type="button"
                  //       onClick={() => handleDeleteItem(product._id)}
                  //       className="-m-2 flex items-center p-1"
                  //     >
                  //       <TrashIcon className="h-5 w-5 text-red-500" />
                  //     </button>
                  //   </div>
                  // </li>
                  <CartItemCard product={product} key={productIdx} />
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="food-card mt-16 rounded-lg bg-white px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
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
                    {cartData.cart.totalPrice}
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
                    {cartData.cart.shippingFee}
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
                    {cartData.cart.taxEstimate}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="flex items-center text-base font-medium text-gray-900">
                    <IndianRupee size={13} className="mt-1 font-semibold" />
                    {cartData.cart.totalPrice +
                      cartData.cart.shippingFee +
                      cartData.cart.taxEstimate}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold sm:text-14size">
                    **
                    {numberToWords.toWords(
                      cartData.cart.totalPrice +
                        cartData.cart.shippingFee +
                        cartData.cart.taxEstimate,
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
            Looks like your cart is hungry! Why not add some delicious items?
          </p>
          <Link
            to={"/all-food"}
            className="min-w-52 rounded-md bg-orange-400 px-3 py-2 text-center text-14size font-semibold tracking-wide text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Explore Our Menu
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
