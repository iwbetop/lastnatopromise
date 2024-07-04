"use server";

import { z } from "zod";
import fs from "node:fs";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const schema = z.object({
    id: z.string(),
    image: z.instanceof(File)
});

export async function AvatarBackend(state: {message: any}, formData: FormData){
    const validated = schema.safeParse(Object.fromEntries(formData))
    if(!validated.success){
        return { message: "Something went wrong" }
    }
    const extension = validated.data.image.name.split(".").pop();
    if(extension === "undefined"){
        return { message: "Image is invalid!" };
    }

    const fileName = `${validated.data.id}.${extension}`;
    const stream = fs.createWriteStream(`public/avatar/${fileName}`);
    const bufferedImage = await validated.data.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if(err){
            return { message: "Something went wrong!" };
        }
    });
    const imageLink = `/avatar/${fileName}`;

    await prisma.user.update({
        where: { id: validated.data.id },
        data: { image: imageLink }
    });
    revalidatePath("/")
    redirect("/");
}