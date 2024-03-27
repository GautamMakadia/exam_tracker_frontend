"use server"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";


export async function authenticate(
    prevState: any,
    formData: FormData
) {
    const email = formData.get('email')?.toString() as string
    const password = formData.get('password')?.toString() as string
    
    try {

        await signInWithEmailAndPassword(auth, email, password)
        
        const user = auth.currentUser 
        if (user) {      
    
            console.log(user.uid)
            setCookie('user', user.uid, {cookies: cookies, maxAge: 60 * 60 * 10})
            return {
                message: "login successfull",
                uid: user.uid
            }

        } else {
            const error = Error("Firebase Auth Api/SDK Error.") 

            throw error
        }    
    } catch(error) {
        console.error(error)
        if (error instanceof Error) {
            console.error(error.message)
            return {
                error: error.name,
                message: error.message,
                uid: ""
            }
        }
        
    }   
    
    return {
        error: "Somthing unsual happend",
        message: "Please try again"
    }

}
