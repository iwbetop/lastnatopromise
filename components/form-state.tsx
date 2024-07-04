"use client";
import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";

type FormStateProps = {
    formState: (
        state: { message: string },
        formData: FormData
    ) => Promise<{
        message: any
    }>,
    children: React.ReactNode
}

export function FormState(props: FormStateProps){

    const { formState, children } = props;
    const [state, formAction] = useFormState(formState, { message: null });

    return(
        <form action={formAction}>
            <div className="space-y-4">
                {children}
            </div>
            {
                state && (
                    <>
                        {state.message && (
                            <p className={cn(
                                "p-1 my-2 text-sm",
                                !state.message.includes("success") ? "text-destructive" :
                                "text-emerald-500"
                            )}>{state.message}</p>
                        )}
                    </>
                )
            }
        </form>
    );
}

export function InputControl({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    return(
        <div className="grid gap-3 w-full">
            {children}
        </div>
    );
}
export function FormControl({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    return(
        <div className="flex flex-col md:flex-row gap-3 w-full">
            {children}
        </div>
    );
}
