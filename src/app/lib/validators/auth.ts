import { z } from "zod";

export const signInValidator = z.object({
  email: z
    .string({ message: "Email is Required" })
    .email({ message: "Email is Invalid" }),
  password: z
    .string({ message: "Password is Required" })
    .min(6, "Password must contain at least 6 character(s)"),
});

export const signUpValidator = z.object({
  fullName: z.string({ message: "Full Name is Required" }),
  email: z
    .string({ message: "Email is Required" })
    .email({ message: "Email is Invalid" }),
  password: z
    .string({ message: "Password is Required" })
    .min(6, "Password must contain at least 6 character(s)"),
});

export const forgetPasswordValidator = z.object({
  email: z
    .string({ message: "Email is Required" })
    .email({ message: "Email is Invalid" }),
});
export const verifyOTPValidator = z.object({
  email: z
    .string({ message: "Email is Required" })
    .email({ message: "Email is Invalid" }),
  otp: z.string({ message: "OTP is Required" }),
  type: z.enum(["Register", "ForgotPassword"]),
});
export const resetPasswordValidator = z.object({
  password: z
    .string({ message: "Password is Required" })
    .min(6, "Password must contain at least 6 character(s)"),
  confirmPassword: z
    .string({ message: "Confirm password is Required" })
    .min(6, "Confirm password must contain at least 6 character(s)"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
})

export type FormSchemaSignInType = z.input<typeof signInValidator>;
export type FormSchemaForgotPasswordType = z.input<typeof forgetPasswordValidator>;
