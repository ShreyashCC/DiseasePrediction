from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from utils.model_loader import load_model, predict
from utils.image_processing import preprocess_image

app = FastAPI()

# Load models
models = {
    "brain_tumor": load_model("models/brain_tumor_model.keras"),
   # "diabetic_retinopathy": load_model("models/diabetic_model.keras"),
   # "skin_cancer": load_model("models/skin_cancer_model.keras"),
}

@app.get("/")
def home():
    return {"message": "AI Disease Prediction API"}

@app.post("/predict")
async def predict_disease(disease: str, file: UploadFile = File(...)):
    if disease not in models:
        return JSONResponse(content={"error": "Invalid disease type"}, status_code=400)

    # Process image
    image = await file.read()
    processed_img = preprocess_image(image)

    # Get prediction
    prediction, confidence = predict(models[disease], processed_img)

    return JSONResponse(content={"disease": disease, "result": prediction, "confidence": confidence})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
