import { FeedModeToggle } from "./feed-toggle";
import { ThemeModeToggle } from "./theme-toggle";
import Logo from "@/public/udd.png";
import Image from "next/image";

// components
import { Separator } from "./ui/separator";

import { auth } from "@/auth";
import { GetUserByID } from "@/lib/get";


export async function FeedHeader(){
    const session = await auth();
    const user = await GetUserByID(session?.user?.id!)

    return(
        <header className="w-full relative pt-6 pb-3 px-4 md:px-0">
            <div className="flex justify-between items-center">
                <div>
                    <span className="inline-flex w-[54px] h-[54px] relative">
                        <Image src={Logo.src} fill alt="LOGO" className="p-2"/>
                    </span>
                </div>
                <div className="space-x-4">
                    <ThemeModeToggle />
                    <FeedModeToggle image={user?.image} name={`${user?.firstName} ${user?.lastName}`}/>
                </div>
            </div>
            <Separator className="my-4"/>
        </header>
    );
}