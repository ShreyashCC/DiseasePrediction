import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase credentials from the JSON file (update the path as needed)
cred = credentials.Certificate("firebase/firebase_admin_config.json")

# Initialize the Firebase Admin SDK
firebase_admin.initialize_app(cred)

# Initialize Firestore database client
db = firestore.client()

# You can now use `db` to interact with Firestore throughout your FastAPI app.
