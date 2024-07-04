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
import { SigninBackend } from "@/action/signin";

export default function ResetPassword(){
    return(
        <div className="w-[400px] relative">
            <Card>
                <CardHeader>
                    <CardTitle>New Password</CardTitle>
                    <CardDescription>Please enter your new password below:</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={SigninBackend}>
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
                        <Button className="w-full">Reset Now</Button>
                    </FormState>
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <Button variant="link" size="link" asChild>
                        <Link href="/signin">Sign in now</Link>
                    </Button>
                </CardFooter>
            </Card>
            <div className="absolute top-0 right-4">
                <CardBanner />
            </div>
        </div>
    );
}