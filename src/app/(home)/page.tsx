import { getActiveCollection } from "@/lib/data"
import styles from "./page.module.scss"

export default async function Home() {
    const { name, error } = await getActiveCollection()
    
    return (
            <div className={styles.container}>
                <span className="text-3xl font-semibold">Welcome To Exam-Tracker App.</span>
                <span className="text-lg font-medium text-gray-500">Currently Active Collection: {(error!=null) ? error : name} </span>
            </div>
    )
}
