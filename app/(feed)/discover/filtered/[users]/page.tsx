import { auth } from "@/auth";
import prisma from "@/lib/db";
import { GetUserByID } from "@/lib/get";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function GetUserWithSkill(skillId: string, userId: string){
    return await prisma.user.findMany({
        where: {
            skills: {
                some: {
                    skillId
                }
            },
            NOT: {
                id: userId
            }
        },
        include: {
            course: true
        }
    });
}

export default async function Page({params}: {params: {users: string}}){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)

    const users = await GetUserWithSkill(params.users, user?.id!);
    console.log(user)
    return(
        <div className="pt-8">
            {users.length > 0 ? (
                <>
                <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg overflow-hidden  pr-6">
                    <div className="divide-y divide-gray-200">
                        {users.map(user => (
                        <div key={user.id} className="flex justify-between items-center">
                            <div className="flex items-center p-4">
                                    <div className="flex-shrink-0">
                                    <Avatar>
                                    <AvatarImage src={user?.image!} />
                                    <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    </div>
                                    <div className="ml-4">
                                    <p className="text-lg font-semibold text-primary/80 capitalize">{`${user.firstName} ${user.lastName}`}</p>
                                    <p className="text-gray-600">{user.course?.name}</p>
                                    <p className="text-sm text-gray-500">{`Account Status: ${user.accountStatus}`}</p>
                                    <p className="text-sm text-gray-500">{`Educational Status: ${user.educationalStatus}`}</p>
                                    </div>
                            </div>
                            <Button asChild>
                                <Link href={`/view/${user.id}`}>View</Link>
                            </Button>
                        </div>
                        ))}
                    </div>
                </div>
                </>
            ): (
                <p className="pt-10 text-destructive">No user found</p>
            )}
        </div>
    );
}