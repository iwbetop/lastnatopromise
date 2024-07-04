"use server";

import {z} from "zod";
import { date } from "@/lib/zod";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const schema = z.object({
    userId: z.string(),
    name: z.string(),
    achievedDate: z.string().date(),
    description: z.string(),
});

const schema1 = z.object({
    id: z.string(),
});

export async function AddAchievement(state: {message: string}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    let { achievedDate, ...other } = validated.data;
    let start: Date = new Date();
    if(achievedDate.length > 0){
        start = new Date(achievedDate)
    }
   
    if(achievedDate.length < 0){
        return { message: "" }
    }
    if(achievedDate){
        await prisma.achievement.create({
            data: { achievedDate: start, ...other }
        });
    }
    revalidatePath("/achievement")
    redirect("/");
}



export async function DeleteAchievement(state: {message: string}, formData: FormData){
    const validated = schema1.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
   
        await prisma.achievement.delete({
            where: { id: validated.data.id }
        });

    revalidatePath("/achievement")
    redirect("/");
}