import { ThemeModeToggle } from "./theme-toggle";
import Logo from "@/public/udd.png";
import Image from "next/image";

export function CardBanner(){
    return(
        <div>
            <div className="bg-gradient-to-b from-primary to-primary/40 h-24 rounded-b-lg">
                <span className="inline-flex w-16 h-16 relative">
                    <Image src={Logo.src} fill alt="LOGO" className="p-2"/>
                </span>
            </div>
        </div>
    );
}