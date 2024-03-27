import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAeCifPb6IG_pAxjVb7EAwQ_ti9TZq8I00",
    authDomain: "exam-tracker-au.firebaseapp.com",
    projectId: "exam-tracker-au",
    storageBucket: "exam-tracker-au.appspot.com",
    messagingSenderId: "228541932803",
    appId: "1:228541932803:web:37ca8d8f1de68e89333536"
};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
