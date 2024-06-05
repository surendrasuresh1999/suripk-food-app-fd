import React, { useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import { servicesData, brandsData } from "../StaticData";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { serviceBookingForm } from "../FormikSchemas";

const Services = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");

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
    console.log(values);
    console.log(actions);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {Object.keys(initialValues).map((key, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium leading-6 text-black"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                      </label>
                      <Field
                        type={key === "phone" ? "tel" : "text"} // Use 'tel' type for phone input
                        placeholder={`Enter ${key}`}
                        name={key}
                        className={`grow rounded-md bg-white border ${
                          touched[key] && errors[key]
                            ? " border-red-500"
                            : "border-gray-500"
                        } text-black placeholder:text-slate-400`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-2 pt-4 sm:gap-5">
                  <button
                    onClick={() => {
                      handleReset();
                      setOpenDialog(false);
                    }}
                    type="button"
                    className="rounded-md bg-red-50 px-6 border border-red-500 py-2.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-50 px-5 py-2.5 text-sm border border-green-500 font-semibold text-green-600 shadow-sm hover:bg-green-200"
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
      <div className="flex items-center flex-col justify-center service-banner">
        <h1 className="text-white font-bold text-7xl tracking-wide">
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
              <div className="w-full border-t mt-1 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="text-gray-800 bg-gray-50 px-3 font-bold tracking-wide text-20size sm:text-32size">
                Our Services
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-18size max-w-4xl mx-auto text-justify sm:text-center">
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
            <ServiceCard person={person} key={index} setter={setOpenDialog} setServiceTitle={setServiceTitle} />
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
              <div className="w-full border-t mt-1 border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="text-gray-800 bg-gray-50 px-3 font-bold tracking-wide text-20size sm:text-32size">
                Brands love to take Our Services
              </span>
            </div>
          </div>

          <p className="text-gray-500 text-18size max-w-4xl mx-auto text-justify sm:text-center">
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
              className="flex items-center justify-center bg-white px-3 py-4 rounded-md border transition ease-in-out hover:scale-110"
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
