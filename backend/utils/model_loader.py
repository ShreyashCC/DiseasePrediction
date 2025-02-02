import tensorflow as tf
import numpy as np

# Mapping numerical labels to disease names
BRAIN_TUMOR_LABELS = {
    0: "Meningioma Tumor",
    1: "Glioma Tumor",
    2: "Pituitary Tumor",
    3: "No Tumor Detected"
}

def load_model(model_path):
    """Load a .keras model"""
    return tf.keras.models.load_model(model_path)

def predict(model, image_array):
    """Make a prediction using the loaded model"""
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    prediction = model.predict(image_array)

    predicted_class = int(np.argmax(prediction))  # Convert to Python int
    confidence = float(np.max(prediction) * 100)  # Convert to Python float

    return BRAIN_TUMOR_LABELS[predicted_class], confidence
