from fastapi import UploadFile
import pandas as pd

from lib.normalize import to_firebase_dict
from lib.validation import validate_excel_records


def extract_excel_datasheets(exl_file: UploadFile):
    seating_list: dict[str, dict[str, dict]] = {}
    excel_file = pd.ExcelFile(exl_file.file)

    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(exl_file.file, sheet_name=sheet_name)

        if not validate_excel_records(df):
            raise Exception("empty data found")

        records = df.to_dict(orient='records')

        seating_list[f"{sheet_name}"] = to_firebase_dict(records)

    return seating_list
