import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
  isLoading: false,
  isError: false,
};
const jwtToken = Cookies.get("jwtToken");

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add: (state, action) => {
      axios
        .put(`${Baseurl.baseurl}/api/cart`, action.payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          if (response.status) {
            toast.success(response.data.message);
          } else {
            console.log(response.data.message);
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error(error.message);
        });
    },
    decrement: (state, action) => {
      state;
    },
    increment: (state, action) => {
      state;
    },
    deleteItem: (state, action) => {
      axios
        .delete(`${Baseurl.baseurl}/api/cart/${action.payload}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          if (res.status) {
            toast.success(res.data.message);
            // queryClient.invalidateQueries("cartData");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
    fetchCartItems: (state, action) => {
      console.log(state);
      console.log(action);
    },
  },
});

export const { add, decrement, increment, deleteItem, fetchCartItems } =
  cartSlice.actions;

export default function getCartItems() {
  axios
    .get(`${Baseurl.baseurl}/api/cart/all`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    .then((res) => {
      if (res.data.status) {
        console.log(res.data);
        dispatch(fetchCartItems(res.data));
      } else {
        toast.error(res.data.message);
      }
    })
    .catch((err) => {
      toast.error(err.message);
    });
}
