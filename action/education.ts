"use server";

import {z} from "zod";
import { date } from "@/lib/zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const schema = z.object({
    userId: z.string(),
    name: z.string(),
    startDate: z.string().date(),
    endDate: z.string().date(),
});

const schema1 = z.object({
    id: z.string(),
});

export async function AddEducation(state: {message: string}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    let { startDate, endDate, ...other } = validated.data;
    let start: Date = new Date();
    let end: Date = new Date();
    if(startDate.length > 0){
        start = new Date(startDate)
    }
    if(endDate.length > 0){
        end = new Date(endDate)
    }
    if(startDate.length < 0 || endDate.length < 0){
        return { message: "" }
    }
    if(startDate && endDate){
        await prisma.education.create({
            data: { startDate: start, endDate: end, ...other }
        });
    }
    revalidatePath("/education")
    redirect("/");
}



export async function DeleteEducation(state: {message: string}, formData: FormData){
    const validated = schema1.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
   
        await prisma.education.delete({
            where: { id: validated.data.id }
        });

    revalidatePath("/education")
    redirect("/");
}