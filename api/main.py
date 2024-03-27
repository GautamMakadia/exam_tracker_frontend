from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

from fastapi.middleware.cors import CORSMiddleware
from router import records, collection


app = FastAPI()
mime_excel = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

app.include_router(records.router)
app.include_router(collection.router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
    "http://192.168.1.24:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def hello():
    return {
        "msg": "this is atmiya exam tracker api"
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)