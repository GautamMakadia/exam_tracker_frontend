from model.datafields import FirebaseFields, ExcelFields
from typing import Any
from collections.abc import Hashable


def to_firebase_dict(records: list[dict[Hashable, Any]]):
    firebase_record = {}

    for data in records:
        bench: str = data[ExcelFields.bench]
        [_, bench_no] = bench.split(bench[0])
        bench_side = bench[0]

        firebase_record[str(data[ExcelFields.enrollmentNo])] = {
            FirebaseFields.enrollmentNo: data[ExcelFields.enrollmentNo],
            FirebaseFields.name: data[ExcelFields.name],
            FirebaseFields.semester: data[ExcelFields.semester],
            FirebaseFields.department: data[ExcelFields.department],
            FirebaseFields.block: data[ExcelFields.block],
            FirebaseFields.room: data[ExcelFields.room],
            FirebaseFields.benchSide: bench_side,
            FirebaseFields.benchNo: bench_no
        }

    return firebase_record
