"use client"


export default function RecordsView({ records , styles }: {
    records:any,  styles: {
    readonly [key: string]: string;
}}) {
    return (
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
                        const pos = (index % 2 == 0) ? styles.even : styles.odd

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
            <div className={styles.bottom}>

            </div>
        </div>
    )
}