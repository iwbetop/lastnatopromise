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

export default function Signin(){
    return(
        <div className="w-[400px] relative">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Please Sign In to Access Your Account</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={SigninBackend}>
                        <InputControl>
                            <Label>Email</Label>
                            <Input 
                                type="email"
                                name="email"
                            />
                        </InputControl>
                        <InputControl>
                            <Label>Password</Label>
                            <Input 
                                type="password"
                                name="password"
                            />
                        </InputControl>
                        <Button className="w-full">Signin</Button>
                    </FormState>
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <Button variant="link" size="link" asChild>
                        <Link href="/signup">Do not have an account?</Link>
                    </Button>
                    <Button variant="link" size="link" asChild>
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </Button>
                </CardFooter>
            </Card>
            <div className="absolute top-0 right-4">
                <CardBanner />
            </div>
        </div>
    );
}