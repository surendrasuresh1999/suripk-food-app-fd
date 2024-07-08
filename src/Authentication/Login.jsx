import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoginSchema } from "../FormikSchemas";
import { Field, Form, Formik, ErrorMessage } from "formik";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const userObject = {
    email: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (values, actions) => {
    axios
      .post(`${Baseurl.baseurl}/api/user/login`, values)
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem(
            "foodieUserDetails",
            JSON.stringify(res.data.user),
          );
          Cookies.set("jwtToken", res.data.token, { expires: 120 });
          navigate("/");
          actions.resetForm();
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
    <div className="auth-banner h-dvh">
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="rounded-xl bg-slate-500 p-4 sm:mx-auto sm:w-full sm:max-w-sm 2xl:max-w-md">
          <h2 className="mb-3 text-center text-2xl font-bold leading-9 tracking-tight text-white sm:text-30size">
            Sign in to your account
          </h2>
          <Formik
            initialValues={userObject}
            validationSchema={userLoginSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-2">
                {Object.keys(userObject).map((key, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={key}
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        {key.charAt(0).toUpperCase()}
                        {key.slice(1, key.length)}
                      </label>
                      {key === "password" && (
                        <p className="font-600 text-right text-14size tracking-wide text-gray-900">
                          <Link
                            to="/reset-password"
                            className="font-semibold leading-6 text-blue-600 hover:text-blue-700"
                          >
                            Forgot Password?
                          </Link>
                        </p>
                      )}
                    </div>
                    {key === "password" ? (
                      <Field name="password">
                        {({
                          field /* { name, value, onChange, onBlur } */,
                        }) => (
                          <div className="relative rounded-md shadow-sm">
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter Password"
                              className={`block w-full rounded-md border bg-gray-600 pr-10 ${
                                touched[key] && errors[key]
                                  ? "border-red-500"
                                  : "border-gray-500"
                              } text-white placeholder:text-slate-400`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                              {showPassword ? (
                                <EyeOff className="text-slate-400" />
                              ) : (
                                <Eye className="text-slate-400" />
                              )}
                            </button>
                          </div>
                        )}
                      </Field>
                    ) : (
                      <Field
                        type={key}
                        name={key}
                        placeholder="Enter email address"
                        className={`grow rounded-md border bg-gray-600 ${
                          touched[key] && errors[key]
                            ? "border-red-500"
                            : "border-gray-500"
                        } text-white placeholder:text-slate-400`}
                      />
                    )}
                    <ErrorMessage
                      name={key}
                      component="p"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center rounded-md bg-blue-500 py-2 text-14size font-medium tracking-wide text-white"
                >
                  {isSubmitting ? (
                    <LoaderCircle
                      className="animate-spin text-white"
                      size={21}
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-2 text-sm text-white">
            Don't have account?{" "}
            <Link
              to="/signup"
              className="ml-2 text-16size font-semibold leading-6 text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
          {/* <div className="mt-6">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-800 focus-visible:ring-transparent"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-sm font-semibold leading-6 tracking-wide text-white">
                Google
              </span>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
