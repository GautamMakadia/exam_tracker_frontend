'use client'

import styles from './style.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import RecordsView from '@/components/record_table/record_view'
import { api } from '@/lib/url'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url, {
    credentials: "include",
    mode: "cors",
    cache: "force-cache"
}).then(r => r.json())

export default function Seating() {
    const { data, error, isLoading } = useSWR(api("/collections"), fetcher)
    const [option, setOption] = useState<string>("")
    const [records, setRecords] = useState<any>()


    useEffect(() => {
        if (option != "") {
            setRecords(undefined)
            fetch(api(`/records/${option}`), {
                credentials: "include",
                mode: "cors",
            }
            ).then(r => r.json()).then((data) => { setRecords(data) })
        }
    }, [option])

    let isCollectionEmpty = true
    let collection: string[] = []


    if (data) {
        collection = data.ref
        isCollectionEmpty = false
    }

    if (records) {
        isCollectionEmpty = false
    }


    const handelChnage = (event: ChangeEvent<HTMLSelectElement>) => {
        setOption(event.currentTarget.value)
        console.log(event.currentTarget.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1 className={styles.title}>Exam Seating Records:</h1>
                {   isLoading ? <span className={styles.loading}>Please wait...</span> : (
                    (error) ? <span className={styles.error}>{"backend service is not responding"}</span> :
                        ((isCollectionEmpty) ? <span className={styles.error}>Data Not Found</span> : (
                            <select name="records" id="records" onChange={handelChnage} className={styles.ref_selection} defaultValue="choose">
                                <option value="choose" disabled selected>Exam Name</option>
                                {collection.map((val) => { return <option value={val} key={val}>{val}</option> })}
                            </select>
                        )
                        )
                    )
                }
            </div>

            <div className={styles.record_container}>

                {   isLoading ? <span className={styles.loading}>Please wait...</span> : (
                    error ? <span className={styles.error}>Somthing Went Wrong</span> : (
                        (isCollectionEmpty) ? <span className={styles.not_found}>No Data Found</span> : (
                            records ? (<RecordsView records={records} styles={styles} />) :
                            <span>Please Select Exam Name From Above To Fetch Records</span>
                        )
                    )
                    )
                }
            </div>
        </div>

    )

}