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
import { InfoIcon } from "lucide-react";
import { InputParamField } from "@/components/field-param";

// action
import { EmailVerificationBackend } from "@/action/email-verification";

export default function EmailVerification(){
    return(
        <div className="w-[400px] relative">
            <Card>
                <CardHeader>
                    <CardTitle>Verify Your Email to Sign In</CardTitle>
                    <CardDescription className="w-10/12">Please verify your email now to proceed with signing in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormState formState={EmailVerificationBackend}>
                        <InputControl>
                            <Label>Email</Label>
                            <Input 
                                type="email"
                                name="email"
                            />
                        </InputControl>
                        <Button className="w-full">Verify</Button>
                        <InputParamField name="token"/>
                    </FormState>
                </CardContent>
                <CardFooter className="">
                    <div className="flex gap-2 items-start">
                        <InfoIcon className="w-4 h-4 mt-1"/>
                        <p className="text-sm text-muted-foreground">You will be signed in automatically after verifying your email.</p>
                    </div>
                </CardFooter>
            </Card>
            <div className="absolute top-0 right-4">
                <CardBanner />
            </div>
        </div>
    );
}