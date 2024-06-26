import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { passwordChangeSchema } from "../FormikSchemas";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const userObject = {
    email: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleFormSubmit = (values, actions) => {
    console.log(values);
    // axios
    //   .put(`${Baseurl.baseurl}/api/user/update-password`, values)
    //   .then((res) => {
    //     if (res.data.status) {
    //       toast.success(res.data.message);
    //       actions.resetForm();
    //       setTimeout(() => {
    //         navigate("/login");
    //       }, 2000);
    //     } else {
    //       toast.error(res.data.message);
    //       console.log("res", res);
    //       actions.setSubmitting(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err.message);
    //     toast.error(err.message);
    //     actions.setSubmitting(false);
    //   });
  };

  return (
    <div className="h-dvh bg-gray-900">
      <div className="h-full flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm 2xl:max-w-md">
          <h2 className="mb-3 text-center text-2xl sm:text-30size font-bold leading-9 tracking-tight text-white">
            Reset your password
          </h2>
          <Formik
            initialValues={userObject}
            validationSchema={passwordChangeSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="flex flex-col gap-3">
                {Object.keys(userObject).map((key, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      {key.charAt(0).toUpperCase()}
                      {key.slice(1, key.length)}
                    </label>
                    {key === "confirmPassword" ? (
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <div className="relative rounded-md shadow-sm">
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className={`block w-full rounded-md pr-10 bg-gray-600 border ${
                                touched[key] && errors[key]
                                  ? " border-red-500"
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
                        type={key === "newPassword" ? "password" : key}
                        name={key}
                        placeholder={`Enter ${key}`}
                        className={`grow rounded-md bg-gray-600 border ${
                          touched[key] && errors[key]
                            ? " border-red-500"
                            : "border-gray-500"
                        } text-white placeholder:text-slate-400`}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-500 mt-2 text-white flex items-center justify-center font-medium tracking-wide text-14size rounded-md py-2"
                >
                  {isSubmitting ? (
                    <LoaderCircle
                      className="text-white animate-spin"
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
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
