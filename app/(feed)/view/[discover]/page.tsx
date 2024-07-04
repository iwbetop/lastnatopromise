import { GetUserByID } from "@/lib/get";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Camera } from "lucide-react";
import { FormState } from "@/components/form-state";
import Image from "next/image";
import { CircleAlert } from "lucide-react"

import Udd from "@/public/udd.png"
import { Button } from "@/components/ui/button";
import { SelectReport } from "@/components/selectreport";
import { AddSkill } from "@/action/skill";
import { auth } from "@/auth";
import { SendReportBackend } from "@/action/sendReport";

export default async function User({params}: {params: {discover: string}}){
    const user = await GetUserByID(params.discover)
    const session = await auth();
    const me = await GetUserByID(session?.user.id!)
    return(
      <div className="space-y-4 relative">
            <Card>
                    <CardHeader>
                        <CardTitle>Profile Card</CardTitle>
                        <CardDescription>A blank canvas awaiting the strokes of personality and achievements.</CardDescription>
                    </CardHeader>
                    <Separator className="bg-background" />
                    <CardContent className="pt-4">
                    <div className="flex gap-4">
                        <div className="w-fit h-fit relative">
                            <Avatar className="w-24 h-24">
                                <AvatarImage src={user?.image!} />
                                <AvatarFallback>{user?.firstName}</AvatarFallback>
                                </Avatar>
                        </div>
                            <div>
                                <h1 className="text-2xl capitalize">{user?.firstName} {user?.lastName}</h1>
                                <p className="">{user?.course?.name}</p>
                                <p className="capitalize">{user?.gender.toLowerCase()}</p>
                            <div className="grid my-2">
                                <span className="space-x-2">
                                        <span className="text-muted-foreground text-sm">Birthday:  </span>
                                        <span>
                                            {user?.birthday?.toDateString()}
                                        </span>
                                    </span>
                                    <span className="space-x-2">
                                        <span className="text-muted-foreground text-sm">Address:  </span>
                                        <span>
                                            {user?.street}, {user?.city}, {user?.province}, {user?.country}
                                        </span>
                                    </span>
                                    <span className="space-x-2">
                                        <span className="text-muted-foreground text-sm">Personal Email:  </span>
                                        <span>
                                            {user?.personalEmail}
                                        </span>
                                    </span>
                                    <span className="space-x-2">
                                        <span className="text-muted-foreground text-sm">Phone number:  </span>
                                        <span>
                                            {user?.phoneNumber}
                                        </span>
                                    </span>
                                    <span className="space-x-2">
                                        <span className="text-muted-foreground text-sm">Bio:  </span>
                                        <span>
                                            {user?.biography}
                                        </span>
                                    </span>
                            </div>
                            </div>
                    </div>

                    </CardContent>
            </Card>
            <Card className="relative">
        <CardHeader>
            <CardTitle>{user?.firstName}'s Skill</CardTitle>
        </CardHeader>
        <CardContent>
            <div>
                {user?.skills.map(item => (
                    <span className="inline-flex items-center relative bg-background p-2 rounded mx-2">
                        {item.skill.name}
                    </span>
                ))}
                {user?.skills.length === 0 && (
                    <p>This user has no skill added yet</p>
                )}
            </div>
        </CardContent>
            </Card>
            <Card className="relative">
        <CardHeader>
            <CardTitle>{user?.firstName}'s Education</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="">
                {user?.educations.map(item => (
                    <div className="w-full py-3">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex gap-3">
                                <span className="inline-flex relative w-10 h-10">
                                    <Image src={Udd.src} fill alt="udd"/>
                                </span>
                                <div>
                                    <h3>{item.name}</h3>
                                    <span className="text-muted-foreground text-sm ">
                                        <span>{item.startDate.toDateString()}</span>
                                        {item.endDate && (
                                            <span> - {item.endDate?.toDateString()}</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {user?.educations?.length! === 0 && (
                    <p>This user has no educations added yet</p>
                )}
            </div>
        </CardContent>
            </Card>
            <Card className="relative">
        <CardHeader>
            <CardTitle>{user?.firstName}'s Project</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="">
                {user?.projects.map(item => (
                    <div className="w-full py-3">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex gap-3">
                                <span className="inline-flex relative w-10 h-10">
                                    <Image src={Udd.src} fill alt="udd"/>
                                </span>
                                <div>
                                    <h3>{item.name}</h3>
                                    <span className="text-muted-foreground text-sm">
                                        <span>{item.completedDate.toDateString()}</span>
                                    </span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                          
                        </div>
                    </div>
                ))}
                {user?.projects?.length! === 0 && (
                    <p>No project not added yet</p>
                )}
              
            </div>
        </CardContent>
            </Card>
            <Card className="relative">
        <CardHeader>
            <CardTitle>{user?.firstName}'s Achievement</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="">
                {user?.achievement.map(item => (
                    <div className="w-full py-3">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex gap-3">
                                <span className="inline-flex relative w-10 h-10">
                                    <Image src={Udd.src} fill alt="udd"/>
                                </span>
                                <div>
                                    <h3>{item.name}</h3>
                                    <span className="text-muted-foreground text-sm">
                                        <span>{item.achievedDate.toDateString()}</span>
                                    </span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {user?.educations?.length! === 0 && (
                    <p>No achievements added yet</p>
                )}
            </div>
        </CardContent>
        </Card>
        <div className="absolute top-2 right-6">
            <Dialog>
            <DialogTrigger className="cursor-pointer" asChild>
                <Button variant="destructive" size="icon" asChild>
                    <CircleAlert className="w-9 h-9 p-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Report the user?</DialogTitle>
                <DialogDescription>
                    this is a description
                </DialogDescription>
                </DialogHeader>
                <FormState formState={SendReportBackend}>
                    <SelectReport />
                    <input type="hidden" name="reportedUserId" value={user?.id} />
                    <input type="hidden" name="userId" value={me?.id} />
                    <Button className="w-full" variant="destructive">Report</Button>
                </FormState>
            </DialogContent>
            </Dialog>
        </div>
      </div>
    );
}