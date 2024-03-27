from .firebase import firestore_db, firestore_async
from asyncio import Task
import asyncio
from model.datafields import FirebaseFields
import time

root_collection: str = "seating-example"


async def upload_seating_records(collection: str, records: dict[str, dict[str, dict]]):
    print(f"\nsubmitting record to : {collection}\n")

    start = time.time()

    task_list: list[Task] = []
    for items in records.values():
        async for value in task_itr(items):
            task = Task(upload(collection, value[FirebaseFields.enrollmentNo], value))
            task_list.append(task)

    await asyncio.wait(task_list)

    await (firestore_db.collection('exam-list')
           .document('exam-list')
           .update({"list": firestore_async.firestore.ArrayUnion([collection])}))

    await firestore_db.collection('current-instance').document('current-instance').set({'name': collection})

    print(f"total time taken by async req: {time.time() - start}")


async def upload(collection: str, key: str, data: dict):
    await firestore_db.collection(collection).document(f"{key}").set(data)


async def task_itr(items: dict[str, dict]):
    for item in items.values():
        yield item
