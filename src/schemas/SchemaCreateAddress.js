import * as Yup from "yup";

export const addressSchema = Yup.object().shape({
  fullAddress: Yup.string()
    .min(5, "Full address must be at least 5 characters")
    .max(30, "Full address must be at most 30 characters")
    .required("Full address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string()
    .required("Postal code is required")
    .matches(/^\d+$/, "Postal code must be numeric"),
  country: Yup.string().required("Country is required"),
});
