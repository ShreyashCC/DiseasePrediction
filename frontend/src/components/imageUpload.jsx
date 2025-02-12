import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ImageUpload = () => {
  const { disease } = useParams();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(`http://127.0.0.1:8000/predict/${disease}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ error: "Error making prediction" });
    }
    setLoading(false);
  };

  return (
    <div className="max-h-full fixed inset-0 overflow-auto flex justify-center items-center px-4 py-8">
      <div className="max-w-2xl max-h-full mx-auto mt-20 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-6 bg-gray-800 text-white text-center">
        <h2 className="text-2xl font-semibold mb-4">{`Upload Image for ${disease.replace('_', ' ').toUpperCase()} Prediction`}</h2>
        
        <input type="file" accept="image/*" onChange={handleImageChange} className="p-2 border rounded mb-4" />
        
        {!preview && <div className="mb-8"></div>} {/* Adds space if no image is uploaded */}
        
        {preview && <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded mb-4 mx-auto" />}
        
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white mb-4"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (
          <div className="text-lg font-bold mt-4 p-4 bg-gray-800 rounded-lg w-full text-center">
            <p className="mb-2">Disease: {result.disease}</p>
            <p className="mb-2">Result: {result.result}</p>
            <p>Confidence: {result.confidence?.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
