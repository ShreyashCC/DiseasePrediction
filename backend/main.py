from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)



@app.get("/")
def home():
    return {"message": "AI Disease Prediction API"}

@app.post("/predict/brain_tumor")
async def predict_brain_tumor(file: UploadFile = File(...)):  
    """Predict Brain Tumor Using the model"""

    try:
        loaded_model = tf.keras.models.load_model("models/brain_tumor_model.keras", compile=False)
        train_class_names = ["glioma", "meningioma", "notumor", "pituitary"]

        # Read uploaded image
        image = await file.read()
        
        # Open image, resize, and convert to array (Same as your code)
        img = Image.open(io.BytesIO(image)).convert("RGB")
        img = img.resize((256, 256))  # Ensure correct input size
        img_array = tf.keras.preprocessing.image.img_to_array(img)  # Convert to array
        img_array = tf.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make Prediction
        prediction = loaded_model.predict(img_array)
        print("\n",prediction,"\n")

        # Extract Predicted Class and Confidence
        predicted_class_index = int(np.argmax(prediction))  # Convert to Python int
        print("\n",predicted_class_index,"\n")
        predicted_class = train_class_names[predicted_class_index]
        confidence = float(round(100 * np.max(prediction), 2))  # Convert to Python float

        return JSONResponse(content={
            "disease": "Brain Tumor",
            "result": predicted_class, 
            "confidence": confidence
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
    
@app.post("/predict/kidney_disease")
async def predict_brain_tumor(file: UploadFile = File(...)):  
    """Predict Kidney dieases Using the model"""

    try:
        loaded_model = tf.keras.models.load_model("models/kidney_disease_model.keras", compile=False)
        print("after model load")
        train_class_names = ["Cyst", "Normal", "Stone", "Tumor"]

        # Read uploaded image
        image = await file.read()
        
        # Open image, resize, and convert to array (Same as your code)
        img = Image.open(io.BytesIO(image)).convert("RGB")
        img = img.resize((256, 256))  # Ensure correct input size
        img_array = tf.keras.preprocessing.image.img_to_array(img)  # Convert to array
        img_array = tf.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make Prediction
        prediction = loaded_model.predict(img_array)
        print("\n",prediction,"\n")

        # Extract Predicted Class and Confidence
        predicted_class_index = int(np.argmax(prediction))  # Convert to Python int
        print("\n",predicted_class_index,"\n")
        predicted_class = train_class_names[predicted_class_index]
        confidence = float(round(100 * np.max(prediction), 2))  # Convert to Python float

        return JSONResponse(content={
            "disease": "Kidney Disease",
            "result": predicted_class, 
            "confidence": confidence
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

#python3 -m uvicorn main:app --reload
