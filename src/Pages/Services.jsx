import React, { useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import { servicesData, brandsData } from "../StaticData";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { serviceBookingForm } from "../FormikSchemas";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";

const Services = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");
  const jwtToken = Cookies.get("jwtToken");
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventLocation: "",
    NumberOfGuests: "",
    SpecialRequests: "",
  };

  const handleSubmit = (values, actions) => {
    // Handle form submission here
    console.log({ ...values, eventTitle: serviceTitle.split(" ")[0] });
    console.log(actions);
    axios
      .post(
        `${Baseurl.baseurl}/api/service`,
        { ...values, eventTitle: serviceTitle.split(" ")[0] },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )
      .then((res) => {
        if (res.status) {
          toast.success(res.data.message);
          actions.resetForm();
          setOpenDialog(false);
        } else {
          toast.error(res.data.message);
        }
      });
    // actions(false); // Set submitting state to false
  };

  const bookServiceDialog = () => {
    return (
      <Dialog
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle>{serviceTitle} Booking Form</DialogTitle>
        <DialogContent dividers={true}>
          <Formik
            initialValues={initialValues}
            validationSchema={serviceBookingForm}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors, handleReset }) => (
              <Form>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {Object.keys(initialValues).map((key, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                      </label>
                      {key === "SpecialRequests" ? (
                        <Field
                          as="textarea"
                          rows={3}
                          cols={4}
                          style={{ resize: "none" }}
                          className={`grow rounded-md border bg-white ${
                            touched[key] && errors[key]
                              ? "border-red-500"
                              : "border-gray-500"
                          } text-black placeholder:text-slate-400`}
                          name={key}
                        />
                      ) : (
                        <Field
                          type={key === "phone" ? "tel" : "text"}
                          placeholder={`Enter ${key}`}
                          name={key}
                          className={`grow rounded-md border bg-white ${
                            touched[key] && errors[key]
                              ? "border-red-500"
                              : "border-gray-500"
                          } text-black placeholder:text-slate-400`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p className="py-1">
                  <b>Note:</b> we will call provided number for collecting food
                  information
                </p>
                <div className="flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
                  <button
                    onClick={() => {
                      handleReset();
                      setOpenDialog(false);
                    }}
                    type="button"
                    className="rounded-md border border-red-500 bg-red-50 px-6 py-2.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-green-500 bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-200"
                  >
                    Confirm
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-12">
      <div className="service-banner flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold tracking-wide text-white">
          Services
        </h1>
      </div>
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="mt-1 w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-gray-50 px-3 text-20size font-bold tracking-wide text-gray-800 sm:text-32size">
                Our Services
              </span>
            </div>
          </div>

          <p className="mx-auto max-w-4xl text-justify text-18size text-gray-500 sm:text-center">
            inappropriate behavior is often laughed off as “boys will be boys,”
            women face higher conduct standards especially in the workplace.
            That’s why it’s crucial that, as women.
          </p>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((person, index) => (
            <ServiceCard
              person={person}
              key={index}
              setter={setOpenDialog}
              setServiceTitle={setServiceTitle}
            />
          ))}
        </ul>
      </div>
      <div className="space-y-10 py-10">
        <div className="space-y-6">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="mt-1 w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-gray-50 px-3 text-20size font-bold tracking-wide text-gray-800 sm:text-32size">
                Brands love to take Our Services
              </span>
            </div>
          </div>

          <p className="mx-auto max-w-4xl text-justify text-18size text-gray-500 sm:text-center">
            inappropriate behavior is often laughed off as “boys will be boys,”
            women face higher conduct standards especially in the workplace.
            That’s why it’s crucial that, as women.
          </p>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {brandsData.map((person, index) => (
            <li
              key={index}
              className="flex items-center justify-center rounded-md border bg-white px-3 py-4 transition ease-in-out hover:scale-110"
            >
              <img src={person.imgUrl} alt="cover-img" />
            </li>
          ))}
        </ul>
      </div>
      {openDialog && bookServiceDialog()}
    </div>
  );
};

export default Services;
