import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import { GetUserByID } from "@/lib/get";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  import { InputControl } from "@/components/form-state";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
import { AvatarBackend } from "@/action/avatar";

export default async function Profile(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)
    return(
        <div>
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
                            <Dialog>
                            <DialogTrigger><Camera className="w-7 h-7 absolute bottom-6 right-0 bg-primary p-1 rounded-full"/></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Change your avatar</DialogTitle>
                                <DialogDescription>
                                   <FormState formState={AvatarBackend}>
                                    <input type="hidden" name="id" value={user?.id} />
                                   <InputControl>
                                   <Label>Change Avatar</Label>
                                   <Input type="file" name="image"/>
                                   </InputControl>
                                   <Button>Change</Button>
                                   </FormState>
                                </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                            </Dialog>
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
        </div>
    );
}