import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { SkillComboboxDemoFilter } from "@/components/searchfilterskill";
import { GetSkills } from "@/lib/get";
export default async function DiscoverLayout({children}: {children: React.ReactNode}){
    const skills = await GetSkills();
    return(
        <div>
            <Card>
            <CardHeader>
                <CardTitle>Welcome to Skill Finder</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <SkillComboboxDemoFilter props={skills} />
                {children}
            </CardContent>
            </Card>
        </div>
    );
}