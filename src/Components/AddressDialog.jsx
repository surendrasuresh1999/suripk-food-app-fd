import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import React, { forwardRef } from "react";
import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { LoaderCircle } from "lucide-react";
import { Field, Form, Formik } from "formik";
import { adressSchema } from "../FormikSchemas";
import toast from "react-hot-toast";

const memoryOptions = [
  { name: "Home", inStock: true },
  { name: "Work", inStock: true },
  { name: "Hotel", inStock: true },
  { name: "Other", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddressDialog = ({ open, setter, handler }) => {
  const [mem, setMem] = useState(null);

  const userObject = {
    name: "",
    contact: "",
    landmark: "",
    flatNumber: "",
    address: "",
  };

  const radioOptionFun = () => {
    return (
      <fieldset aria-label="Choose a memory option">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium leading-6 text-gray-900">
            Save addresses as*
          </div>
        </div>

        <RadioGroup
          value={mem}
          onChange={setMem}
          className="mt-2 grid grid-cols-4 gap-3 sm:grid-cols-6"
        >
          {memoryOptions.map((option) => (
            <Radio
              key={option.name}
              value={option}
              className={({ focus, checked }) =>
                classNames(
                  checked
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
                  "cursor-pointer rounded-md p-1 text-12size font-medium sm:px-4 sm:py-2 sm:text-14size",
                )
              }
            >
              {option.name}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    );
  };

  const handleSubmit = (values, actions) => {
    if (mem && mem.name) {
      const addressData = { ...values, addressType: mem.name };
      handler(addressData, actions);
    } else {
      toast.error("save address as must be non-empty");
      actions.setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => setter(false)}
    >
      <DialogTitle>
        <span className="text-14size font-bold sm:text-22size">
          Enter complete address
        </span>
      </DialogTitle>
      <DialogContent dividers={true} sx={{ padding: "16px" }}>
        {radioOptionFun()}
        <Formik
          initialValues={userObject}
          validationSchema={adressSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="flex flex-col gap-2">
              {Object.keys(userObject).map((key, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {key.charAt(0).toUpperCase()}
                      {key.slice(1, key.length)}
                    </label>
                  </div>
                  <Field
                    type={key === "contact" ? key : "text"}
                    name={key}
                    placeholder={`Enter ${key}`}
                    className={`grow rounded-md border bg-white ${
                      touched[key] && errors[key]
                        ? "border-red-500"
                        : "border-gray-500"
                    } text-gray-900 placeholder:text-slate-400`}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="mt-2 flex items-center justify-center rounded-md bg-orange-500 py-2 text-14size font-medium tracking-wide text-white"
              >
                {isSubmitting ? (
                  <LoaderCircle className="animate-spin text-white" size={21} />
                ) : (
                  "Save address"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
