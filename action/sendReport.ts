"use server";

import { z } from "zod";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
    userId: z.string(),
    reportedUserId: z.string(),
    reportReason: z.string()
});

export async function SendReportBackend(state: {message: any}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    await prisma.report.create({
        data: { ...validated.data }
    });
    revalidatePath("/discover")
    redirect("/discover");
}