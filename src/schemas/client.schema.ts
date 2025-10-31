import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const ZodClientSchema = z.strictObject({
  username: z.string({
    error: (issue) =>
      issue.input === undefined
        ? `${issue.path} is required.`
        : `${issue.path} should be ${issue.expected}.`,
  }),
  name: z.string({ error: "Name should be string!" }).nullable().optional(),
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? `${issue.path} is required.`
        : `${issue.path} should be valid`,
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${issue.path} is required.`
          : `${issue.path} should be ${issue.expected}.`,
    })
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter.")
    .regex(/[0-9]/, "Password must contain a number."),

  phoneNumber: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? `${issue.path} is required.`
          : `${issue.path} should be ${issue.expected}.`,
    })
    .refine((val) => {
      const phone = parsePhoneNumberFromString(val);
      return phone?.isValid();
    }, "Invalid phone number"),

  address: z
    .string({ error: "Address should be string!" })
    .nullable()
    .optional(),

  avatarUrl: z.url("Invalid URL").nullable().optional(),
});

// infer TypeScript type directly from schema
export type ZodClientType = z.infer<typeof ZodClientSchema>;
