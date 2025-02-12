import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          
        } else {
          navigate("/login");
        }
      } catch (error) {
        toast.error("Error fetching user data: " + error.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    try {
      await auth.signOut();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  }

  const diseases = [
    { name: "Brain Tumor", key: "brain_tumor", image: "/images/brain_tumor.jpg" },
    { name: "Diabetic Retinopathy", key: "diabetic_retinopathy", image: "/images/diabetic_retinopathy.jpg" },
    { name: "Skin Cancer", key: "skin_cancer", image: "/images/skin_cancer.jpg" },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-auto flex justify-center items-start px-4 py-8 bg-gray-900">
      <div className="w-full max-w-4xl mx-auto mt-20">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4 text-white">
            {userDetails?.photo && (
              <img 
                src={userDetails.photo} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {userDetails?.firstName || "User"}!
              </h1>
              <p className="text-gray-300">{userDetails?.email}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseases.map((disease) => (
            <div
              key={disease.key}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/predict/${disease.key}`)}
            >
              <div className="aspect-video bg-gray-700">
                <img 
                  src={disease.image} 
                  alt={disease.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {disease.name}
                </h3>
                <p className="text-gray-300">
                  Upload an image to get instant AI-powered prediction
                </p>
              </div>
            </div>
          ))}
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full mx-4 text-white">
              <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;