from fastapi import FastAPI
from firebase.firebase_admin import db

app = FastAPI()

@app.get("/test")
def test_firestore():
    # Example: get a collection from FirestoreS
    users = db.collection("users").get()
    users_list = [user.to_dict() for user in users]
    return {"users": users_list}
