import * as Yup from "yup";

export const userSignUpSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const passwordChangeSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const userLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const subScriptionSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const serviceBookingForm = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  eventDate: Yup.string(),
  eventLocation: Yup.string().required("Event location is required"),
  NumberOfGuests: Yup.number().required("Number of guests value is required"),
  SpecialRequests: Yup.string().max(
    255,
    "Special requests must be at most 255 characters",
  ),
});

export const adressSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Invalid contact number")
    .max(10, "Contact number cannot exceed 10 digits"),
  landmark: Yup.string(),
  flatNumber: Yup.string(),
  address: Yup.string().required("Address or locality is required"),
});
