'use client'

import { useFormState, useFormStatus } from "react-dom"
import styles from "./login.module.scss"
import { useRouter } from "next/navigation"
import { authenticate } from "./_action"
import AtmiyaLogo from "@/assets/image/logo.png"
import { stat } from "fs"


const initialState = {
    error: "",
    message: "",
    uid:""
}

export default function Login() {

    const [state, loginAction] = useFormState(authenticate, initialState)
    const router = useRouter()
    
    if (state.uid) {
        router.push('/')
    }

    return (
        <div className={styles.root}>
            <div className={styles.branding}>
                <img src={AtmiyaLogo.src} alt="atmiya-university" className="w-36 drop-shadow-2xl" />
            </div>

            <div className={styles.container}>
                <h1 className="text-3xl font-bold my-3">Atmiya University</h1> 
                <form action={loginAction} className={styles.form + ""}>
                    <div className={styles.input_group}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="email@domain.com" required/>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="password" required/>
                    </div>
                    <LoginButton/>
                    <p>{state.message}</p> 
                </form>
            </div>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" value="Login" name="login" className={styles.submit + " mt-4"} >
            { pending ? "Login.." : "Login" }
        </button>
    )
}