


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import SignInWithGoogle from "./signInWithGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  useEffect(() => {
    const handleNotifications = () => {
      
      
      if (location.state?.fromRegistration) {
        toast.success("Registration successful! Please login now.", {
          position: "top-center",
          autoClose: 3000,
          toastId: "registration-success"
        });
        navigate(location.pathname, { replace: true, state: {} });
      }
    };

    handleNotifications();
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCheckingUser) return;
    
    try {
      setIsCheckingUser(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user data exists in Firestore
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await auth.signOut();
        toast.error("Account data not found. Please register first.", {
          position: "top-center",
          autoClose: 3000,
          toastId: "missing-data-error"
        });
        return;
      }

      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 2000,
        toastId: "login-success"
      });
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        toastId: "login-error"
      });
    } finally {
      setIsCheckingUser(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-auto flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-md mx-auto mt-20 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-6 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold pb-5 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Your email</label>
            <input
              type="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Your password</label>
            <input
              type="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full"
          >
            Login
          </button>
        </form>
        <SignInWithGoogle />
        <p className="text-center text-sm mt-4">
          New user? <a href="/register" className="underline cursor-pointer">Register Here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;