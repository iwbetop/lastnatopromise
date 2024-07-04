// Import zod for schema validation
import { z } from "zod";
import { bio, date, email, name, password, phone } from "@/lib/zod";

// Define zod schema for email verification form data
export const emailSchema = z.object({
    email,
    token: z.string()
});

// Define zod schema for signin form data
export const signin = z.object({
    email,
    password
});

// Define zod schema for signup form data
export const signup = z.object({
    email,
    password,
    confirmPassword: password
}).superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match"
        });
    }
});

export const onboard = z.object({
    id: z.string(),
    firstName: name,
    lastName: name,
    middleName: name,
    country: z.string().min(2),
    province: z.string().min(2),
    city: z.string().min(2),
    street: z.string().min(2),
    personalEmail: email,
    phoneNumber: z.string().min(1).max(12),
    birthday: date(z.string().refine(val => val.length > 0, {
        message: "Birthday is invalid"
    })),
    image: z.instanceof(File),
    biography: bio,
    courseId: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"])
});