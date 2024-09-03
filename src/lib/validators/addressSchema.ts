import * as z from "zod";

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
] as const;

const AddressSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "FullName is required." })
    .regex(/^[a-zA-Z\s.]+$/, {
      message: "FullName must be a string.",
    }),
  phoneNumber: z
    .string()
    .length(10, { message: "Phone number should be 10 digits." })
    .regex(/^[6-7-8-9]\d{9}$/, {
      message: "Phone number should start with 6-9 and contain only digits.",
    }),
  email: z.string().email({ message: "Invalid email." }),
  state: z.enum([...indianStates]),
  address: z.string().min(1, { message: "required." }),
  "city/District": z.string().min(1, { message: "required." }),
  pincode: z
    .string()
    .length(6, { message: "Pincode should be 6 digits." })
    .regex(/^\d{6}$/, { message: "Pincode should only contain digits." }),
  addressType: z.enum(["home", "office"], {
    message: "Address must be either 'home' or 'office'.",
  }),
});

export default AddressSchema;
