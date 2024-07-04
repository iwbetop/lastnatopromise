import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CardBanner } from "@/components/auth-card-cta";

// Form
import { 
    FormState,
    InputControl
 } from "@/components/form-state";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// action
import { SignupBackend } from "@/action/signup";

export default function Signup(){
    return(
        <div className="w-[400px] relative">
            <Card>
                <CardHeader>
                    <CardTitle>Hello UDDians!</CardTitle>
                    <CardDescription className="w-10/12">Discover opportunities to showcase yourself around the campus!</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={SignupBackend}>
                        <InputControl>
                            <Label>Email</Label>
                            <Input 
                                type="email"
                                name="email"
                                placeholder="sample.stud.100@cdd.edu.ph"
                            />
                        </InputControl>
                        <InputControl>
                            <Label>Password</Label>
                            <Input 
                                type="password"
                                name="password"
                            />
                        </InputControl>
                        <InputControl>
                            <Label>Confirm Password</Label>
                            <Input 
                                type="password"
                                name="confirmPassword"
                            />
                        </InputControl>
                        <Button className="w-full">Signup</Button>
                    </FormState>
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <Button variant="link" size="link" asChild>
                        <Link href="/signin">Sign in to your account</Link>
                    </Button>
                </CardFooter>
            </Card>
            <div className="absolute top-0 right-4">
                <CardBanner />
            </div>
        </div>
    );
}