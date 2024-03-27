from db.firebase import firestore_db
from fastapi import APIRouter, Request


router = APIRouter()


@router.get('/collection/active')
async def current_instance():
    documents = firestore_db.collection('current-instance').stream()

    response = {}
    async for doc in documents:
        response = doc.to_dict()

    return response


@router.get('/collections')
async def get_collections(request: Request):
    collections = await firestore_db.collection('exam-list').document('exam-list').get()
    doc_list = collections.get("list")

    uid = request.cookies.get('user')
    return {
        "ref": doc_list,
        "uid": uid
    }
