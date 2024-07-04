"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useState } from "react";

  export function SelectCourse(props: {
    props : {
            id: string;
            name: string;
            image: string | null;
        }[]
  }){
    const [course, setCourse] = useState("02e43714-32be-480f-9360-87da6bef8f5b");

    function handleChange(e: string){
        setCourse(e)
    }

    return (
        <>
                   <input type="hidden" name="courseId" value={course} />
        <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Course" />
        </SelectTrigger>
        <SelectContent>
            {props.props.map(item => (
                <SelectItem value={item.id}>{item.name}</SelectItem>
            ))}
        </SelectContent>
        </Select>
        </>
    );
  }

  export function SelectGender(){
    const [course, setCourse] = useState("OTHER");
    function handleChange(e: string){
        setCourse(e)
    }

    return (
        <>
            <input type="hidden" name="gender" value={course} />
                <Select onValueChange={handleChange}>
                    
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem value="MALE">MALE</SelectItem>
                    <SelectItem value="FEMALE">FEMALE</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                </SelectContent>
                </Select>
        
        </>
    );
  }

  export function SelectSkill(props: {
    props : {
            id: string;
            name: string;
        }[]
  }){
    const [course, setCourse] = useState("");

    function handleChange(e: string){
        setCourse(e)
    }

    return (
        <>
        <input type="hidden" name="skillId" value={course} />
        <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Course" />
        </SelectTrigger>
        <SelectContent>
            {props.props.map(item => (
                <SelectItem value={item.id}>{item.name}</SelectItem>
            ))}
        </SelectContent>
        </Select>
        </>
    );
  }