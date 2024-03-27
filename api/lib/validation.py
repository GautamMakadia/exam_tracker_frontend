import pandas as pd


def validate_excel_records(records: pd.DataFrame):
    valid_list = pd.isna(records)

    for record in valid_list.values:
        for cell in record:
            if cell:
                return False

    return True
