from typing import Annotated

from fastapi import APIRouter, UploadFile, Form, HTTPException
from db.firebase import firestore_db
from db.main import upload_seating_records
from lib.extractor import extract_excel_datasheets

router = APIRouter()


@router.get('/records/{collection}')
async def get_records(collection: str):
    response = {}

    docs = firestore_db.collection(collection).stream()

    async for doc in docs:
        response[doc.id] = doc.to_dict()

    return response


@router.post("/records")
async def post_seating_arrangement(
        xl_sheet: UploadFile,
        exam_name: Annotated[str, Form()],
        term: Annotated[str, Form()]
):
    mime_excel = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    if not xl_sheet:
        return {"message": "No file sent"}

    exam_term = f"{exam_name}_{term}"

    if xl_sheet.content_type != mime_excel:
        raise HTTPException(422, detail="File format doesn't math excel format.")

    try:
        seating_list = extract_excel_datasheets(xl_sheet)
        for data in seating_list.values():
            if not data:
                e = Exception("no record found in document to process")
                raise e
    except Exception as e:
        print(e)
        raise HTTPException(406, detail=e.args[0])

    try:
        await upload_seating_records(exam_term, seating_list)
    except Exception as e:
        raise HTTPException(500, detail=e.args[0])

    return {
        "exam-term": exam_term,
        "seating_list": seating_list
    }
