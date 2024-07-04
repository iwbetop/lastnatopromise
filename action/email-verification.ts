"use server";

// Import necessary functions and libraries
import { GetEmailTokenByEMAIL, GetEmailTokenByTOKEN, GetUserByEMAIL } from "@/lib/get";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import prisma from "@/lib/db";

// Import zod for schema validation
import { emailSchema } from "@/lib/schema";

// Backend function for email verification
export async function EmailVerificationBackend(
    state: { message: string }, // State object containing message
    formData: FormData // Form data object
) {
    const validated = emailSchema.safeParse(Object.fromEntries(formData)); // Validate form data against zod schema
    if (!validated.success) { // If validation fails, return error message
        return { message: "Something went wrong" };
    }

    // Check if user with provided email exists
    const user = await GetUserByEMAIL(validated.data.email);
    if (!user) { // If user does not exist, return error message
        return { message: "Account does not exist" };
    }

    // Retrieve email verification token for the user
    const token = await GetEmailTokenByTOKEN(validated.data.token);
    if (!token) { // If token does not exist, return error message
        return { message: "Something went wrong" };
    }

    // Check if token has expired
    if (new Date(token.expires) < new Date()) {
        return { message: "Link has expired!" }; // Return expired link message
    }

    // Update user's email verification status in database
    await prisma.user.update({
        where: { id: user.id },
        data: { email: token.email, verifiedEmail: new Date() }
    });

    // Delete email verification token from database
    await prisma.emailToken.delete({ where: { id: token.id } });

    // Attempt to sign in the user using credentials
    try {
        await signIn("credentials", {
            email: token.email,
            password: token.password,
            redirectTo: "/" // Redirect to homepage after successful signin
        });
    } catch (error) {
        // Handle authentication errors
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Credentials are not valid" }; // Invalid credentials error
                default:
                    return { message: "Something went wrong lolololol" }; // Default error message
            }
        }
        throw error; // Throw any other errors
    }

    // Return success message after successful email verification and signin
    return {
        message: "Your email has been successfully verified. If you're not automatically signed in, please refresh your browser."
    };
}
