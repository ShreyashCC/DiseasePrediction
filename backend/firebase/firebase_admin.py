import firebase_admin
from firebase_admin import credentials, auth

# Initialize Firebase Admin with your service account key
cred = credentials.Certificate('./firebase/AccountServiceKey.json')    # Path to your service account key
firebase_admin.initialize_app(cred)

# Helper function to verify Firebase ID token
def verify_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise Exception("Invalid or expired token") from e
