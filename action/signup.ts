"use server";

// Import necessary functions and libraries
import { GetUserByEMAIL } from "@/lib/get";
import { transporter } from "@/lib/email";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/db";

// Import zod for schema validation
import { signup } from "@/lib/schema";
import { v4 } from "uuid";

// Backend function for user signup
export async function SignupBackend(
    state: { message: string }, // State object containing message
    formData: FormData // Form data object
) {
    let record: Record<string, any> = {}; // Initialize record object
    const validated = signup.safeParse(Object.fromEntries(formData)); // Validate form data against zod schema
    if (!validated.success) { // If validation fails, return error message
        return { message: "Something went wrong" };
    }
    record = validated.data; // Assign validated data to record

    // Check if user with provided email already exists
    const user = await GetUserByEMAIL(record.email);
    if (user) { // If user already exists, return error message
        return { message: "Account already exists" };
    }

    // Hash the user's password
    const hashed = await bcryptjs.hash(validated.data.password, 10);

    // Create user in the database
    await prisma.user.create({
        data: {
            email: validated.data.email,
            password: hashed,
            roleId: "f826bfe3-2243-4b0f-9855-60a757f3203e" // Example roleId, replace with actual role ID
        }
    });

    // Create email verification token
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const emailToken = await prisma.emailToken.create({
        data: {
            email: validated.data.email,
            password: validated.data.password,
            token,
            expires
        }
    });

    // Send verification email to user
    await transporter.sendMail({
        from: process.env.USER,
        to: record.email,
        subject: "Email Verification",
        text: "Please verify your email address to activate your account.",
        html: `
        <div style="background-color: #f0f4f8; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; padding: 20px;">
                <p class="text-lg font-semibold text-gray-800 mb-4">Hello,</p>
                <p class="text-base text-gray-700 mb-4">Please click <a class="text-blue-500 hover:text-blue-700" href="http://localhost:3000/email-verification?token=${emailToken.token}">here</a> to verify your email address and activate your account.</p>
                <p class="text-base text-gray-700 mb-4">If you did not request this verification, please ignore this email.</p>
                <p class="text-base text-gray-700">Thank you!</p>
            </div>
        </div>
        `
    });

    // Return success message after sending verification email
    return { 
        message: "Please check your email to verify your account. Follow the instructions in the email we just sent you." 
    };
}
