from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from firebase.firebase_admin import verify_token  # Import from the correct path

app = FastAPI()

# Load Brain Tumor Model
brain_tumor_model = tf.keras.models.load_model("models/brain_tumor_model.keras", compile=False)

# Define Class Labels for Brain Tumor Prediction
BRAIN_TUMOR_LABELS = ["Meningioma Tumor", "Glioma Tumor", "Pituitary Tumor", "No Tumor Detected"]

@app.get("/")
def home():
    return {"message": "AI Disease Prediction API"}

# Secure the /predict route with Firebase token verification
@app.post("/predict")
async def predict_brain_tumor(file: UploadFile = File(...), token: str = Depends(verify_token)):
    """Predict Brain Tumor (Adapted to Model's Built-in Preprocessing)"""
    try:
        # Read image and convert to RGB
        image = await file.read()
        image = Image.open(io.BytesIO(image)).convert("RGB")

        # Convert image to numpy array (DO NOT resize or normalize here)
        image_array = np.array(image)

        # Ensure image batch shape is correct (Add batch dimension)
        img_batch = np.expand_dims(image_array, axis=0)  # Shape: (1, 256, 256, 3)

        # Model Prediction (Preprocessing is done inside the model itself)
        predictions = brain_tumor_model.predict(img_batch)

        index = int(np.argmax(predictions[0]))  # Convert to Python int
        predicted_class = BRAIN_TUMOR_LABELS[index]
        confidence = float(np.max(predictions[0]) * 100)  # Convert to Python float

        return JSONResponse(content= {
                                      "disease": "brain_tumor",
                                      "result": predicted_class, 
                                      "confidence": confidence
                                      })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
