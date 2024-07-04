"use server";

// Import necessary functions and libraries
import { GetUserByEMAIL } from "@/lib/get";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import fs from "node:fs";
import { unstable_update } from "@/auth";

// Import zod for schema validation
import { onboard } from "@/lib/schema";

// Backend function for user signup
export async function OnboardBackend(
    state: { message: string }, // State object containing message
    formData: FormData // Form data object
) {
    const validated = onboard.safeParse(Object.fromEntries(formData)); // Validate form data against zod schema
    console.log(validated.data)
    if (!validated.success) { // If validation fails, return error message
        console.log(validated.error.flatten())
        return { message: "Something went wrong" };
    }

    let { image, id, birthday, ...other  } = validated.data;
    console.log(birthday)
    if(!birthday){
        return { message: "Birhdate is invalid" }
    }
    
    const extension = image.name.split(".").pop();
    if(extension === "undefined"){
        return { message: "Image is invalid!" };
    }

    const fileName = `${id}.${extension}`;
    const stream = fs.createWriteStream(`public/avatar/${fileName}`);
    const bufferedImage = await image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if(err){
            return { message: "Something went wrong!" };
        }
    });
    const imageLink = `/avatar/${fileName}`;

    // Create user in the database
    await prisma.user.update({
        where: { id: validated.data.id },
        data: { image: imageLink, birthday, onboardingStatus: true, ...other }
    });


   await unstable_update({user: {onboardingStatus: true, ...other}})
    redirect("/")
    // Return success message after sending verification email
    return { 
        message: "Onboarding success" 
    };
}
