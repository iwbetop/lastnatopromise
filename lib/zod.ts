import { z } from "zod";
import { parsePhoneNumber } from "libphonenumber-js";

export function optional<T extends z.ZodTypeAny>(schema: T){
    return z.union([schema, z.literal("")])
            .transform((value) => (value === "" ? undefined : value))
            .optional();
}
export function boolean<T extends z.ZodTypeAny>(schema: T){
    return z.union([schema, z.literal("false")])
            .transform((value) => (value === "true" ? true : false));
}
export function date<T extends z.ZodTypeAny>(schema: T){
    return z.union([schema, z.literal("")])
            .transform((value) => (value === "" ? null : new Date(value)));
}
export const email = z.string({ message: "Please enter a valid email address." })
                      .email({ message: "Please enter a valid email address." })
                      .min(2, { message: "Email address should be at least 2 characters long." })
                      .max(100, { message: "Email address should not exceed 100 characters." });
export const name = z.string({ message: "Please enter a valid name." })
                     .min(2, { message: "Name should be at least 2 characters long." })
                     .max(30, { message: "Name should not exceed 30 characters." })
                     .regex(new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/), {
                        message: "Please enter a valid name (special characters allowed are: ' - , .)."
                    });
export const password = z.string({ message: "Please enter a valid password." })
                         .min(8, { message: "Password should be at least 8 characters long." })
                         .max(32, { message: "Password should not exceed 32 characters long." })
                    .refine((password) => password.length === password.trim().length, {
                       message: "Password cannot start or end with spaces."
                    })
                    .refine((password) => /[A-Z]/.test(password), {
                       message: "Password must contain at least one uppercase letter."
                    })
                    .refine((password) => /[a-z]/.test(password), {
                       message: "Password must contain at least one lowercase letter."
                    })
                    .refine((password) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(password), {
                       message: "Password must contain at least one special character."
                    });
export const bio = z.string({ message: "Please provide a bio." })
                    .min(2, { message: "Bio should be at least 2 characters long." })
                    .max(200, { message: "Bio should not exceed 200 characters." });
export const description = z.string({ message: "Please provide a description." })
                    .min(2, { message: "Description should be at least 2 characters long." })
                    .max(150, { message: "Description should not exceed 150 characters." });
export const phone  = z.string({ message: "Please enter a valid phone number." })
                    .min(2, { message: "Phone number should be at least 2 characters long." })
                    .max(12, { message: "Phone number should not exceed 12 characters." })
                    .refine((phone) => parsePhoneNumber(phone, {defaultCountry: "PH"}), {
                        message: "Please enter a valid phone number for the Philippines."
                    });

