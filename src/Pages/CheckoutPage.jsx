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
  MapPin,
  Phone,
} from "lucide-react";
import Loader from "../common/Loader";
import ConnectionLost from "../common/ConnectionLost";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import noAddress from "../../src/assets/Address-pana (1).svg";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
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

  const getUserAddressess = async () => {
    return await fetch(`${Baseurl.baseurl}/api/address`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["addressData"],
    queryFn: getUserAddressess,
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

  return (
    <div>
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Choose delivery address
              </h2>
              <button
                type="button"
                onClick={() => setOpenAddressDialog(true)}
                className="inline-flex items-center justify-center gap-x-1.5 rounded-md border border-indigo-400 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add new address
                <PlusCircleIcon className="-mr-0.5 h-5 w-5 text-indigo-700" />
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
                      className="mt-4 space-y-2 rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm"
                    >
                      <h1 className="flex items-center gap-2">
                        {icon.User}
                        <span className="text-14size font-bold tracking-wide text-gray-900">
                          {data.receiversName}
                        </span>
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
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white pb-8">
                  <img src={noAddress} alt="cart-empty-img" className="h-44" />
                  <h1 className="text-18size font-bold tracking-wide text-gray-900 sm:text-28size">
                    No Saved Addresses Found
                  </h1>
                  <p className="text-center text-14size font-normal text-gray-600 sm:text-18size px-1">
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
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </a>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.size}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $75.52
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Place order
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
