"use client"
import predefinedReportMessages from "@/lib/reportmessages";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export function SelectReport(){
    const [value, setValue] = useState("");

    function handleSetValue(e: string){
        setValue(e)
    }
    return(
        <>
        <input type="hidden" name="reportReason" value={value} />
            <Select onValueChange={handleSetValue}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Report" />
            </SelectTrigger>
            <SelectContent>
                {predefinedReportMessages.map(item => (
                    <SelectItem value={`${item.message}`}>{item.message}</SelectItem>
                ))}
            </SelectContent>
            </Select>
        </>
    );
}