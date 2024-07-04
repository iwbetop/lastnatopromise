import prisma from "./db";
import { 
    GetEmailTokenByEMAIL, 
    GetPasswordTokenByEMAIL 
} from "@/lib/get";
import { v4 } from "uuid";

// create an user account
type UserProps = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    schoolId: string
}


// create an education item
export type EducationProps = {
    id?: string,
    name: string,
    dateStarted: Date,
    dateEnded: Date | null,
    userId: string
}



// create a email verification token
type EmailVerificationProps = {
    email: string,
    password: string
}

export async function createEmailVerificationToken(
    emailToken: EmailVerificationProps
){
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await GetEmailTokenByEMAIL(emailToken.email);
    if(existingToken){
        await prisma.emailToken.delete({
            where: { id: existingToken.id }
        });
    }
     const emailVerificationToken = await prisma.emailToken.create({
        data: { token, expires, ...emailToken }
     });
     return emailVerificationToken;
}


export async function createPasswordResetToken(email: string){
    const token = v4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await GetPasswordTokenByEMAIL(email);
    if(existingToken){
        await prisma.passwordToken.delete({
            where: { id: existingToken.id }
        });
    }

     const passwordResetToken = await prisma.passwordToken.create({
        data: { token, expires, email }
     });
     return passwordResetToken;
}

