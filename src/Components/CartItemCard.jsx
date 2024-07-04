import React from "react";
import { CartData } from "../context/CartContext";
import { IndianRupee } from "lucide-react";

import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
const CartItemCard = ({ product }) => {
  const { updateCartItem, removeCartItem } = CartData();
  const location = useLocation();

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
    <li className={`food-card rounded-md bg-white p-2.5 pb-2`}>
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
                Quantity: <b className="text-sm">{product.quantity}</b>
              </p>
              <p className="mt-1 flex items-center text-sm font-medium text-gray-900">
                <IndianRupee size={13} className="mt-1 font-semibold" />
                {product.price * product.quantity}
              </p>
            </div>
            {/* from tab device view */}
            <div className="mt-4 hidden sm:mt-0 sm:block sm:pr-9">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleDecreaseQuantity(
                      "decrease",
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
                    handleIncreaseQuantity("increase", product._id, null)
                  }
                  className="rounded border p-1 shadow"
                >
                  <PlusIcon className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              {location.pathname !== "/checkout" && (
                <div className="absolute right-0 top-0">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(product._id)}
                    className="-m-2 inline-flex p-1 text-gray-400 hover:text-gray-500"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="xs:block flex items-center justify-between py-3 sm:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              handleDecreaseQuantity("decrease", product._id, product.quantity)
            }
            className="rounded border p-1 shadow"
          >
            <MinusIcon className="h-4 w-4 text-gray-700" />
          </button>
          <span className="text-14size font-bold tracking-wide text-black">
            {product.quantity}
          </span>
          <button
            onClick={() =>
              handleIncreaseQuantity("increase", product._id, null)
            }
            className="rounded border p-1 shadow"
          >
            <PlusIcon className="h-4 w-4 text-gray-700" />
          </button>
        </div>
        {location.pathname !== "/checkout" && (
          <button
            type="button"
            onClick={() => handleDeleteItem(product._id)}
            className="-m-2 flex items-center p-1"
          >
            <TrashIcon className="h-5 w-5 text-red-500" />
          </button>
        )}
      </div>
    </li>
  );
};

export default CartItemCard;
