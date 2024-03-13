'use client'

import { authenticate } from "@/lib/authentication"
import { useFormState, useFormStatus } from "react-dom"
import styles from "./login.module.scss"
import { useRouter } from "next/navigation"


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
        <div className={styles.root + " h-screen flex flex-col items-center justify-center"}>
            <div className={styles.branding + " m-7"}>
                <h1 className="text-4xl font-bold">Atmiya University </h1>
            </div>

            <div className={styles.container + " flex flex-col items-stretch rounded-xl p-5"}>
                <h1 className="self-center text-3xl font-bold mt-4 mb-4">Exam Tracker Admin</h1>

                <form action={loginAction} className={styles.form + " flex items-center flex-col m-3"}>
                    <div className={styles.input_group}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" id="email" placeholder="email@domain.com" required/>
                    </div>
                    <div className={styles.input_group}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="password" required/>
                    </div>
                    <LoginButton/>
                    {!!state.error && <p>{state.message}</p> }
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