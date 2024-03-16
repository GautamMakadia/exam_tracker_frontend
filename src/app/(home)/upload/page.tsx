'use client'

import { useFormState, useFormStatus } from "react-dom"
import styles from "./style.module.scss"
import { uploadExcelFile } from "./_action";
import { getActiveCollection } from "@/lib/data";
import { useEffect, useState } from "react";
import RecordsView from "@/components/record_table/record_view";


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

    if (state.seating_list != null) {

    }

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
                        <select name="exam_name" id="exam-name" className={styles.selection} required>
                            <option value="CIA-1">CIA-1</option>
                            <option value="CIA-2">CIA-2</option>
                        </select> 
                    </div>
                    
                    <div className={styles.form_group}>
                        <label htmlFor="exam-term">Exam Term: </label>
                        <input type="month" name="term" id="exam-term" required/>
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="exam-term">Seating Records: </label>
                        <input type="file" name="xl_sheet" id="file" required/>
                    </div>


                    <div className={styles.form_group}>
                        <SubmitButton sucess={state.seating_list == null}/>
                    </div>
                    
                </form>
                <div className={styles.uploaded_records}>

                    {
                        ( pending ? <span>Uploading Records</span> : (state.error) ? <span>Somthing Went Wrong</span> : ((state.seating_list != null) ?
                        <RecordsView records={state.seating_list} styles={styles}/> : <span>Uploaded Records Will Be Displayed Here</span> ) )
                    }
                </div>
        </div>
        </>
    )
}

function SubmitButton({sucess}: {sucess:boolean}) {
    const { pending } = useFormStatus()

    return (
        <button type="submit" value="Submit" name="Submit" className={styles.submit} disabled={!sucess}>
            { pending ? "Submitting..." : "Submit" }
        </button>
    )
}


