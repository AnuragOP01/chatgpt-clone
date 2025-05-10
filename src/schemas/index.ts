import { z } from "zod";


const emailSchema = z
  .string({ required_error: "Email is required!" })
  .min(1, { message: "Email is required!" })
  .email({ message: "Invalid email!" });

const passwordSchema = z
  .string({ required_error: "Password is required!" })
  .min(1, { message: "Password is required!" })
  .min(8, { message: "Password must be at least 8 characters!" })
  // .max(25, { message: "Password must be at most 8 characters!" });

const nameSchema = z
  .string({ required_error: "Full name is required!" })
  .min(1, { message: "Full name is required!" })
  .min(3, { message: "Full name must be at least 3 characters." })
  .max(50, { message: "Full name must be at most 50 characters." });

export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export const ResetPasswordSchema = z.object({
  password: passwordSchema,
});


export const RegisterUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  company: z
    .string({ required_error: "Company is required!" })
    .min(1, { message: "Company is required!" })
    .min(2, { message: "Company must be at least 2 characters." }),
  mobile: z
    .string({ required_error: "Number is required!" })
    .min(1, { message: "Number is required!" })
    .min(10, { message: "Number must be at least 10 characters." }),
});


export const CreateProductCategorySchema = z.object({
  name: z
    .string({ required_error: "Name is required!" })
    .min(1, { message: "Name is required!" }),
});


export const AddressSchema = z.object({
  addressName: z
    .string({ required_error: "Street is required!" })
    .min(1, { message: "Street is required!" }),
  street: z
    .string({ required_error: "Street is required!" })
    .min(1, { message: "Street is required!" }),
  city: z
    .string({ required_error: "City is required!" })
    .min(1, { message: "City is required!" }),
  state: z
    .string({ required_error: "State is required!" })
    .min(1, { message: "State is required!" }),
  postalCode: z
    .string({ required_error: "Postal code is required!" })
    .min(1, { message: "Postal code is required!" }),

  country: z
    .string({ required_error: "Country is required!" })
    .min(1, { message: "Country is required!" }),
});
