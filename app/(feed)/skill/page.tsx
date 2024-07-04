import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import { Plus } from "lucide-react";
  import { SelectSkill } from "@/components/selectCourse";
import { FormState, InputControl } from "@/components/form-state";
import { auth } from "@/auth";
import { GetSkills, GetUserByID } from "@/lib/get";
import { Label } from "@/components/ui/label";

import { SkillComboboxDemo } from "@/components/skillcombobox";
import { CategComboboxDemo } from "@/components/skillcatcombobox";
import { AddSkill, DeleteSkill } from "@/action/skill";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

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

export default async function Skill(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    const skills = await GetSkills();
    return(
        <Card className="relative">
        <CardHeader>
            <CardTitle>Skill Management</CardTitle>
            <CardDescription>manage your skill</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                {user?.skills.map(item => (
                    <span className="inline-flex items-center relative bg-background p-2 rounded mx-2">
                        {item.skill.name}
                        <AlertDialog>
                        <AlertDialogTrigger><Minus className="w-4 h-4 ml-3"/></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <FormState formState={DeleteSkill}>
                            <AlertDialogFooter>
                            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                                <input type="hidden" name="id" value={item.id} />
                                <AlertDialogAction type="submit">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                            </FormState>
                        </AlertDialogContent>
                        </AlertDialog>

                    </span>
                ))}
                {user?.skills.length === 0 && (
                    <p>No skill added yet</p>
                )}
            </div>
        </CardContent>
        <Dialog>
        <DialogTrigger><Plus className="w-8 h-8 absolute top-4 right-7"/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add Skill</DialogTitle>
            </DialogHeader>
            <div>
                <FormState formState={AddSkill}>
                    <input type="hidden" name="userId" value={user?.id} />
                    <InputControl>
                        <Label>Select a skill below</Label>
                        <SkillComboboxDemo props={skills}/>
                        <CategComboboxDemo />
                        <Button>Add</Button>
                    </InputControl>
                </FormState>
            </div>
        </DialogContent>
        </Dialog>
        </Card>
    );
}