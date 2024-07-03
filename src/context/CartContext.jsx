import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Baseurl } from "../BaseUrl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();

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

  const addToCart = async (foodData) => {
    try {
      const response = await axios.put(
        `${Baseurl.baseurl}/api/cart`,
        foodData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.status) {
        toast.success(response.data.message);
        queryClient.invalidateQueries("cartData");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const updateCartItem = async (action, productId, foodData) => {
    const apiAction = action === "increase" ? "increase" : "decrease";
    if (action === "decrease" && foodData < 2) {
      toast.error("You can't decrease below 1");
    } else {
      try {
        axios
          .put(`${Baseurl.baseurl}/api/cart/${apiAction}/${productId}`, null, {
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
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `${Baseurl.baseurl}/api/cart/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (response.status) {
        toast.success(response.data.message);
        queryClient.invalidateQueries("cartData");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cartData: data || [],
        isPending,
        error,
        addToCart,
        updateCartItem,
        removeCartItem,
        // fetchCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const CartData = () => useContext(cartContext);
