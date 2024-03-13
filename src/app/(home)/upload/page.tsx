'use client'

import { useFormState, useFormStatus } from "react-dom"
import styles from "./style.module.scss"
import { uploadExcelFile } from "./_action";
import { getActiveCollection } from "@/lib/data";
import { useEffect, useState } from "react";


export default function Upload() {

    const [activeCollection, setActiveCollection] = useState<string>("")
    const [state, uploadAction] = useFormState(uploadExcelFile, {msg: "", seating_list: null, error: ""});
    const { pending } = useFormStatus()

    fetch(`http://localhost:8000/active-collection`)
    .then(r => r.json())
    .then((data)=> {
        const name = data.name 
        setActiveCollection(name)
    })

    return (
        <>
        <div className={styles.upload_container}>
                <div>
                    <span className={styles.form_title}>Upload Seating Records</span>
                    <span> {"[" +"Active: " + activeCollection +"]"}</span>
                </div>

                <form className={styles.form} action={uploadAction} >
                    <div className={styles.form_group}>
                        <label htmlFor="exam-name">Exam Name: </label>
                        <select name="exam_name" id="exam-name" className={styles.selection}>
                            <option value="CIA-1">CIA-1</option>
                            <option value="CIA-2">CIA-2</option>
                        </select> 
                    </div>
                    
                    <div className={styles.form_group}>
                        <label htmlFor="exam-term">Exam Term: </label>
                        <input type="month" name="term" id="exam-term" />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="exam-term">Seating Records: </label>
                        <input type="file" name="xl_sheet" id="file" />
                        
                    </div>


                    <div className={styles.form_group}>
                        <SubmitButton/>
                    </div>
                    
                </form>
                <div className={styles.uploaded_records}>

                    {
                        ( pending ? <span>Uploading Records</span> : (state.error) ? <span>Somthing Went Wrong</span> : ((state.seating_list != null) ?
                        <>
                        <div className={styles.table_container}>
                            <div className={styles.table_header}>
                                <div>Enroll. No.</div>
                                <div>Name</div>
                                <div>Department</div>
                                <div>Semester</div>
                                <div>Block No.</div>
                                <div>Room No.</div>
                                <div>Bench No.</div>
                                <div>Bench Side</div>
                            </div>
                            <div className={styles.table_content}>
                                {
                                    state.seating_list.map((a, index) => {
                                        const pos = (index%2 == 0) ? styles.even : styles.odd
                                        
                                        return (
                                            <>
                                                <div className={`${styles.row} ${pos}`}>
                                                    <div>{a.enrollmentNo}</div>
                                                    <div>{a.name}</div>
                                                    <div>{a.department}</div>
                                                    <div>{a.semester}</div>
                                                    <div>{a.block}</div>
                                                    <div>{a.room}</div>
                                                    <div>{a.benchNo}</div>
                                                    <div>{a.benchSide}</div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div> 
                        </> : <span>Uploaded Records Will Be Displayed Here</span> ) )
                    }
                </div>
        </div>
        </>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" value="Submit" name="Submit" className={styles.submit} >
            { pending ? "Submitting..." : "Submit" }
        </button>
    )
}


