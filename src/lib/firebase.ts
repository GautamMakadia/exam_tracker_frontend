import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCQ_auFDOcjALHFRJMlwN-5CGS659jIKA",
    authDomain: "gautam-authentication.firebaseapp.com",
    projectId: "gautam-authentication",
    storageBucket: "gautam-authentication.appspot.com",
    messagingSenderId: "38754678314",
    appId: "1:38754678314:web:9526fb45cf136209343553",
    measurementId: "G-QQMV708NL8"
};

// const firebaseConfig = {
//     apiKey: "AIzaSyAeCifPb6IG_pAxjVb7EAwQ_ti9TZq8I00",
//     authDomain: "exam-tracker-au.firebaseapp.com",
//     projectId: "exam-tracker-au",
//     storageBucket: "exam-tracker-au.appspot.com",
//     messagingSenderId: "228541932803",
//     appId: "1:228541932803:web:37ca8d8f1de68e89333536"
// };


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
