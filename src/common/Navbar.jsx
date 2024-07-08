import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartData } from "../context/CartContext";
import Badge from "@mui/material/Badge";
import swal from "sweetalert";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import logo from "../../src/assets/logo_new.png";
const navigation = [
  { name: "All Items", path: "/all-food" },
  { name: "Services", path: "/services" },
  { name: "Blogs", path: "/blogs" },
  { name: "My Orders", path: "/my-orders" },
  { name: "My Services", path: "/my-services" },
];

const userNavigation = [{ name: "Profile" }, { name: "Sign out" }];

const Navbar = () => {
  const { cartData } = CartData();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProfileSlideOver, setOpenProfileSlideOver] = useState(false);
  const location = useLocation();
  const userDetails = JSON.parse(localStorage.getItem("foodieUserDetails"));
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const handleUserAction = (index) => {
    if (index === 0) {
      setOpenProfileSlideOver(true);
    } else {
      swal({
        title: "Are you sure?",
        text: "You are about to sign out from your account. Are you sure you want to proceed?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willSignOut) => {
        if (willSignOut) {
          localStorage.removeItem("foodieUserDetails");
          Cookies.remove("jwtToken");
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between gap-x-6 p-6 lg:px-8">
        <span className="flex lg:flex-1">
          <Link to="/">
            <img
              className="w-16 object-cover object-center sm:w-28"
              src={logo}
              alt="website-logo"
            />
          </Link>
        </span>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 ${location.pathname === item.path ? "bg-slate-300" : "bg-transparent hover:bg-slate-100"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <Link to={"/cart"}>
            <Badge
              badgeContent={cartData?.cart?.foodItems?.length}
              color="primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-8 text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Badge>
          </Link>
          <div className="hidden lg:block">
            {userDetails ? (
              <div className="flex justify-center">
                <Popover>
                  <PopoverButton className="flex w-full items-center px-2 py-1 text-sm/6 font-semibold text-orange-400 outline-none">
                    <Avatar sx={{ height: 35, width: 35 }} />
                    <span className="hidden lg:flex lg:items-center">
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </PopoverButton>
                  <Transition
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <PopoverPanel
                      anchor="bottom"
                      className={`popover-shadow z-[200] divide-y divide-white/5 rounded-md bg-white text-sm/6 text-gray-600 shadow-2xl [--anchor-gap:var(--spacing-5)]`}
                    >
                      <div className="flex flex-col py-2">
                        {userNavigation.map((button, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              handleUserAction(i);
                            }}
                            className={`px-6 py-1 text-start text-14size font-semibold tracking-wide text-gray-700 hover:bg-slate-50`}
                          >
                            {button.name}
                          </button>
                        ))}
                      </div>
                    </PopoverPanel>
                  </Transition>
                </Popover>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="inline-block rounded-md bg-orange-400 px-4 py-2 text-14size font-medium tracking-wide text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Transition show={mobileMenuOpen}>
        <Dialog className="relative z-[60]" onClose={setMobileMenuOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden bg-gray-500 bg-opacity-75">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Link to="/" className="p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                              className="mt-0.5 h-8 w-auto"
                              src="https://res.cloudinary.com/dplj90agk/image/upload/v1720418977/suri3_2x_xoyhrt.png"
                              alt=""
                            />
                          </Link>
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="divide-y divide-gray-500/10">
                          <div>
                            {navigation.map((item, i) => (
                              <Link
                                key={i}
                                to={item.path}
                                className="block rounded-lg py-2 text-base font-semibold leading-7 text-gray-900"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                          <div className="py-4">
                            {userDetails ? (
                              <button
                                type="button"
                                onClick={() => handleUserAction(1)}
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
                              >
                                Sign out
                              </button>
                            ) : (
                              <Link
                                to={"/login"}
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
                              >
                                Login
                              </Link>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setOpenProfileSlideOver(true);
                              }}
                              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
                            >
                              Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* profile slide over */}
      {userDetails && (
        <Transition show={openProfileSlideOver}>
          <Dialog className="relative z-[60]" onClose={setOpenProfileSlideOver}>
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden bg-gray-500 bg-opacity-75">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <TransitionChild
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <DialogPanel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Link to="/" className="p-1.5">
                              <span className="sr-only">Your Company</span>
                              <img
                                className="mt-0.5 h-10 w-auto"
                                src="https://res.cloudinary.com/dplj90agk/image/upload/v1720418977/suri3_2x_xoyhrt.png"
                                alt=""
                              />
                            </Link>
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpenProfileSlideOver(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <div className="divide-y divide-gray-500/10">
                            <div className="flex items-start gap-2">
                              <Avatar
                                sx={{
                                  bgcolor: deepOrange[500],
                                  height: 100,
                                  width: 100,
                                }}
                              >
                                {userDetails.name.slice(0, 2).toUpperCase()}
                              </Avatar>
                              <div>
                                <p className="text-24size text-gray-800">
                                  {userDetails.name}
                                </p>
                                <span className="text-20size text-gray-600">
                                  {userDetails.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default Navbar;
