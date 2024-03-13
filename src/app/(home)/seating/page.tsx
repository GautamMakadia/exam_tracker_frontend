'use client'

import { getCollections } from '@/lib/data'
import styles from './style.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function Seating() {
    const { data, error, isLoading } = useSWR('http://localhost:8000/collections', fetcher)
    const [ option, setOption] = useState<string>("")
    const [ records , setRecords] = useState<any>()


    useEffect(() => {
        if (option != "") {
            setRecords(undefined)
            fetch(`http://localhost:8000/records/${option}`)
                .then(r => r.json()).then((data) => { setRecords(data) })
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
                <h1 className={styles.title}>Exam Seating Records</h1>
                {isLoading ? <span className={styles.loading}>Please wait...</span> : (
                    (error) ? <span>Somthing went wrong</span> :
                        ((isCollectionEmpty) ? <span className={styles.error}>data not found</span> : (
                            <select name="records" id="records" onChange={handelChnage} className={styles.ref_selection} defaultValue="choose">
                                <option value="choose" disabled selected>Choose here</option>
                                { collection.map((val) => { return <option value={val} key={val}>{val}</option> })}
                            </select>
                        )
                        )
                )
                }
            </div>

            <div className={styles.record_container}>

                {isLoading ? <span>Please wait...</span> : (
                    error ? <span>Somthing Went Wrong</span> : (isCollectionEmpty) ? <span>No Data Found</span> : records ? (
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
                                    Object.keys(records).map((key, index) => {
                                        const a = records[key]
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
                    ): <span>Select Exam From Above</span> )
                }

            </div>
        </div>

    )

}