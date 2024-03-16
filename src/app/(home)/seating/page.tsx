'use client'

import { getCookie } from 'cookies-next'
import styles from './style.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import useSWR from 'swr'
import RecordsView from '@/components/record_table/record_view'

const fetcher = (url: string) => fetch(url, {
    credentials: "include",
    mode: "cors",
}).then(r => r.json())

export default function Seating() {
    const { data, error, isLoading } = useSWR('http://localhost:8000/collections', fetcher)
    const [option, setOption] = useState<string>("")
    const [records, setRecords] = useState<any>()


    useEffect(() => {
        if (option != "") {
            setRecords(undefined)
            fetch(`http://localhost:8000/records/${option}`, {
                credentials: "include",
                mode: "cors",
            }
            ).then(r => r.json()).then((data) => { setRecords(data) })
        }
    }, [option])

    let isCollectionEmpty = true
    let isRecordEmpty = true
    let collection: string[] = []

    const table = () => <>

    </>

    if (data) {
        collection = data.ref
        isCollectionEmpty = false
    }

    if (records) {
        isCollectionEmpty = false
        console.log(records)
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
                    (error) ? <span className={styles.error}>Somthing went wrong</span> :
                        ((isCollectionEmpty) ? <span className={styles.error}>data not found</span> : (
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
                            <span>Select Exam From Above</span>
                        )
                    )
                    )
                }
            </div>
        </div>

    )

}