import { auth } from "@/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { GetUserByID } from "@/lib/get";
import Udd from "@/public/udd.png"
import Image from "next/image";

import { FormState, InputControl, FormControl } from "@/components/form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { AddSkill } from "@/action/skill";
import { Minus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Plus } from "lucide-react";
import { AddEducation, DeleteEducation } from "@/action/education";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { AddAchievement, DeleteAchievement } from "@/action/achievement";
import { Textarea } from "@/components/ui/textarea";
import { AddProject, DeleteProject } from "@/action/project";

  export default async function Project(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    return(
        <Card className="relative">
        <CardHeader>
            <CardTitle>Manage Project</CardTitle>
            <CardDescription>Customize your Project</CardDescription>
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
                            <AlertDialog>
                            <AlertDialogTrigger><Minus className="w-6 h-6"/></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                            <FormState formState={DeleteProject}>
                                <input type="hidden" name="id" value={item.id} />
                                <AlertDialogFooter>
                                    <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                    <AlertDialogAction type="submit">Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                            </FormState>
                            </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
                {user?.educations?.length! < 0 && (
                    <p>No educations not added yet</p>
                )}
                <Dialog>
                <DialogTrigger><Plus className="w-7 h-7 absolute top-4 right-6"/></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Project</DialogTitle>
                    </DialogHeader>
                    <FormState formState={AddProject}>
                        <input type="hidden" name="userId" value={user?.id} />
                        <InputControl>
                            <Label>Project Name</Label>
                            <Input type="text" name="name"/>
                        </InputControl>
                        <FormControl>
                        <InputControl>
                            <Label>Completed Date</Label>
                            <Input type="date" name="completedDate"/>
                        </InputControl>
                        </FormControl>
                        <InputControl>
                        <Label>Description</Label>
                        <Textarea name="description"/>
                        </InputControl>
                        <Button className="w-full">Add</Button>
                    </FormState>
                </DialogContent>
                </Dialog>
            </div>
        </CardContent>
        </Card>
    );
  }