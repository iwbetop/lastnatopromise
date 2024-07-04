"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

const schema = z.object({
    userId: z.string(),
    skillId: z.string(),
    category: z.string()
});
const schema1 = z.object({
    id: z.string(),
});

export async function AddSkill(state: {message: string}, formData: FormData){
    const validated = await schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    await prisma.userSkill.create({
        data: { ...validated.data }
    });
    revalidatePath("/skill");
    redirect("/skill")
}

export async function DeleteSkill(state: {message: string}, formData: FormData){
    const validated = await schema1.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }

    await prisma.userSkill.delete({
        where: { id: validated.data.id }
    });
    revalidatePath("/skill");
    redirect("/skill")
}