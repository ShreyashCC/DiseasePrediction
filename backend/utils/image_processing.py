from PIL import Image
import numpy as np
import io
import tensorflow as tf

def preprocess_image(image_bytes):
    """Preprocess the image for the model"""
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))  # Resize to model's expected input size
    image_array = np.array(image) / 255.0  # Normalize pixel values
    return image_array
