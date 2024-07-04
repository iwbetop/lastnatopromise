"use server";

// Import necessary functions and libraries
import { GetUserByEMAIL } from "@/lib/get";
import { createEmailVerificationToken } from "@/lib/create";
import { transporter } from "@/lib/email";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

// Import zod for schema validation
import { signin } from "@/lib/schema";

// Backend function for user signin
export async function SigninBackend(
    state: { message: string }, // State object containing message
    formData: FormData // Form data object
) {
    let record: Record<string, any> = {}; // Initialize record object
    const validated = signin.safeParse(Object.fromEntries(formData)); // Validate form data against zod schema
    if (!validated.success) { // If validation fails, return error message
        return { message: "Something went wrong" };
    }
    record = validated.data; // Assign validated data to record

    // Check if user with provided email exists
    const user = await GetUserByEMAIL(record.email);
    if (!user) { // If user does not exist, return error message
        return { message: "Account does not exist" };
    }

    // Check if user account is archived, locked, or suspended
    if (
        user.accountStatus === "ARCHIEVED" ||
        user.accountStatus === "LOCKED" ||
        user.accountStatus === "SUSPENDED"
    ) {
        return { message: "Account is not active" }; // Return error message if account status is not active
    }

    // Check if user's email is verified
    if (!user.verifiedEmail) {
        // Create email verification token
        const emailtoken = await createEmailVerificationToken(record.email);

        // Send verification email to user
        await transporter.sendMail({
            from: process.env.USER,
            to: record.email,
            subject: "Email Verification",
            text: "Please verify your email address to sign in",
            html: `
            <div style="background-color: #f0f4f8; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; padding: 20px;">
                    <p class="text-lg font-semibold text-gray-800 mb-4">Hello,</p>
                    <p class="text-base text-gray-700 mb-4">Please click <a class="text-blue-500 hover:text-blue-700" href="http://localhost:3000/email-verification?token=${emailtoken.token}">here</a> to verify your email address and activate your account.</p>
                    <p class="text-base text-gray-700 mb-4">If you did not request this verification, please ignore this email.</p>
                    <p class="text-base text-gray-700">Thank you!</p>
                </div>
            </div>
            `
        });

        return { message: "Verification email has been successfully sent" }; // Return success message after sending verification email
    }

    // Attempt to sign in the user using credentials
    try {
        await signIn("credentials", {
            email: record.email,
            password: record.password,
            redirectTo: "/" // Redirect to homepage after successful signin
        });
    } catch (error) {
        // Handle authentication errors
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Credentials are not valid!" }; // Invalid credentials error
                default:
                    return { message: "Something went wrong" }; // Default error message
            }
        }
        throw error; // Throw any other errors
    }

    redirect("/"); // Redirect to homepage after successful signin
    return { message: "" }; // Empty message (though unreachable due to redirect)
}
