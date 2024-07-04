import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function matched(
  inputA: string, inputB: string
){
  return inputA === inputB;
}

export function empty(inputA: string){
  return !(inputA.trim().length > 0)
}

export function message(inputA: string){
  return { message: inputA }
}

export function makeBoolean(inputA: string){
  return inputA === "true" ? true : false;
}

export function formattedError(error: string){
  const message = error.split(";").map((error) => {
    if(error.startsWith('Validation error:')){
      const phase1 = error.split(":")[1].trim();
      return phase1.split(`at "`)[0].trim();
    }
    return error.split(`at "`)[0].trim();
  });
  return message;
}

export function calculateAge(birthday: Date) {

  // Get today's date
  const today = new Date();

  // Calculate age in years
  let age = today.getFullYear() - birthday.getFullYear();

  // Check if birthday hasn't passed this year
  if (today.getMonth() < birthday.getMonth() ||
      (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}