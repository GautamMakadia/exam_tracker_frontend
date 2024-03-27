import firebase_admin
from firebase_admin import credentials, firestore_async

firebase_credentials = (
    credentials.Certificate("api/config/exam-tracker-au-firebase-adminsdk-ude8m-902dd33a45.json")
)

firebase_app = firebase_admin.initialize_app(firebase_credentials)

firestore_db = firestore_async.client(firebase_app)


