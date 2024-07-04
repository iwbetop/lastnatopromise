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

  export default async function Education(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    return(
        <Card className="relative">
        <CardHeader>
            <CardTitle>Manage Education</CardTitle>
            <CardDescription>Customize your education</CardDescription>
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
                            <FormState formState={DeleteEducation}>
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
                        <DialogTitle>Add Education</DialogTitle>
                    </DialogHeader>
                    <FormState formState={AddEducation}>
                        <input type="hidden" name="userId" value={user?.id} />
                        <InputControl>
                            <Label>School Name</Label>
                            <Input type="text" name="name"/>
                        </InputControl>
                        <FormControl>
                        <InputControl>
                            <Label>Start Date</Label>
                            <Input type="date" name="startDate"/>
                        </InputControl>
                        <InputControl>
                            <Label>End Date</Label>
                            <Input type="date" name="endDate"/>
                        </InputControl>
                        </FormControl>
                        <Button className="w-full">Add</Button>
                    </FormState>
                </DialogContent>
                </Dialog>
            </div>
        </CardContent>
        </Card>
    );
  }