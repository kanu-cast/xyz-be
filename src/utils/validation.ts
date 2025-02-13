import * as yup from "yup";

export const registerUserSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup
    .string()
    .oneOf(["admin", "employee"], "Invalid role")
    .required("Role is required")
});

// export const loginUserSchema = yup.object({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().required("Password is required")
// });

// export const registerUserSchema = yup.object({
//   name: yup.string().required("Name is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Password must be at least 6 characters")
//     .required("Password is required"),
//   role: yup
//     .string()
//     .oneOf(["admin", "employee"], "Invalid role")
//     .required("Role is required")
// });

export const loginUserSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required")
});

export const inventoryItemSchema = yup.object({
  name: yup.string().required("Name is required"),
  category: yup
    .string()
    .oneOf(["Device", "Furniture", "Cleaning Material", "Food Utensil"])
    .required("Category is required"),
  condition: yup
    .string()
    .oneOf(["new", "good", "worn out", "broken"])
    .required("Condition is required"),
  status: yup
    .string()
    .oneOf(["available", "borrowed", "damaged", "disposed"])
    .required("Status is required")
});

export const borrowingSchema = yup.object({
  user_id: yup.string().required("User ID is required"),
  item_id: yup.string().required("Item ID is required"),
  expected_return_date: yup.date().required("Expected return date is required")
});

export const personSchema = yup.object({
  full_name: yup.string().required("Full name is required"),
  national_id: yup.string().required("National ID is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  residence: yup.string().required("Residence is required"),
  role: yup.string().oneOf(["trainee", "employee"]).required("Role is required")
});

export const damageReportSchema = yup.object({
  item_id: yup.string().required("Item ID is required"),
  description: yup.string().required("Description is required"),
  status: yup
    .string()
    .oneOf(["pending", "repaired", "disposed"])
    .required("Status is required")
});
