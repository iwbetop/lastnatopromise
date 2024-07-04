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

export default function ForgotPassword(){
    return(
        <div className="w-[400px] relative">
            <Card>
                <CardHeader>
                    <CardTitle>Forgot your password</CardTitle>
                    <CardDescription>You will receive a password reset link</CardDescription>
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
                        <Button className="w-full">Send Link</Button>
                    </FormState>
                </CardContent>
                <CardFooter className="flex-col items-start">
                    <Button variant="link" size="link" asChild>
                        <Link href="/signin">Already remembered your password? Sign in here.</Link>
                    </Button>
                </CardFooter>
            </Card>
            <div className="absolute top-0 right-4">
                <CardBanner />
            </div>
        </div>
    );
}