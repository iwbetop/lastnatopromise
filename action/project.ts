"use server";

import {z} from "zod";
import { date } from "@/lib/zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
    userId: z.string(),
    name: z.string(),
    completedDate: z.string().date(),
    description: z.string(),
});

const schema1 = z.object({
    id: z.string(),
});

export async function AddProject(state: {message: string}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    let { completedDate, ...other } = validated.data;
    let start: Date = new Date();
    if(completedDate.length > 0){
        start = new Date(completedDate)
    }
   
    if(completedDate.length < 0){
        return { message: "" }
    }
    if(completedDate){
        await prisma.project.create({
            data: { completedDate: start, ...other }
        });
    }
    revalidatePath("/project")
    redirect("/");
}



export async function DeleteProject(state: {message: string}, formData: FormData){
    const validated = schema1.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
   
        await prisma.project.delete({
            where: { id: validated.data.id }
        });

    revalidatePath("/project")
    redirect("/");
}