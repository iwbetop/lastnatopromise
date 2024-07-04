import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { FormState ,InputControl, FormControl } from "@/components/form-state";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { OnboardBackend } from "@/action/onboard";
  import { SelectCourse, SelectGender } from "@/components/selectCourse";
  import { GetUserByID, getCourses } from "@/lib/get";
  import { Button } from "@/components/ui/button";
  import { auth } from "@/auth";
  import { Textarea } from "@/components/ui/textarea";

export default async function Onboarding(){
    const courses = await getCourses()
    const session = await auth()
    const user = await GetUserByID(session?.user?.id!);

    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome to UDD FOLIO!</CardTitle>
                    <CardDescription>Get started with your account in just a few minutes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={OnboardBackend}>
                        <input type="hidden" name="id" value={user?.id} />
                        <FormControl>
                            <InputControl>
                                <Label>First Name</Label>
                                <Input type="text" name="firstName"/>
                            </InputControl>
                            <InputControl>
                                <Label>Last Name</Label>
                                <Input type="text" name="lastName"/>
                            </InputControl>
                        </FormControl>
                        <FormControl>
                            <InputControl>
                                <Label>Middle Name</Label>
                                <Input type="text" name="middleName"/>
                            </InputControl>
                            <InputControl>
                                <Label>Birthdate</Label>
                                <Input type="date" name="birthday"/>
                            </InputControl>
                        </FormControl>
                        <FormControl>
                            <InputControl>
                                <Label>Country</Label>
                                <Input type="text" name="country"/>
                            </InputControl>
                            <InputControl>
                                <Label>Province</Label>
                                <Input type="text" name="province"/>
                            </InputControl>
                        </FormControl>
                        <FormControl>
                            <InputControl>
                                <Label>City</Label>
                                <Input type="text" name="city"/>
                            </InputControl>
                            <InputControl>
                                <Label>Street</Label>
                                <Input type="text" name="street"/>
                            </InputControl>
                        </FormControl>
                        <FormControl>
                            <InputControl>
                                <Label>Personal Email</Label>
                                <Input type="email" name="personalEmail"/>
                            </InputControl>
                            <InputControl>
                                <Label>Phone Number</Label>
                                <Input type="text" name="phoneNumber"/>
                            </InputControl>
                            <InputControl>
                                <Label>Avatar</Label>
                                <Input type="file" name="image"/>
                            </InputControl>
                        </FormControl>
                       <FormControl>
                        <SelectCourse props={courses}/>
                        <SelectGender />
                       </FormControl>
                       <InputControl>
                       <Label>Biography</Label>
                       <Textarea name="biography"/>
                       </InputControl>
                       <Button className="w-full">Complete</Button>
                    </FormState>
                </CardContent>
            </Card>
        </div>
    );
}