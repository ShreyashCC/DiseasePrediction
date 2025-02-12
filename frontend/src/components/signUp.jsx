import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SignInWithGoogle from "./signInWithGoogle";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });

      toast.success("Registration successful! Please login now.", {
        position: "top-center",
        autoClose: 3000
      });
      setTimeout(() => navigate("/login", { state: { fromRegistration: true } }), 1500);

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email already registered. Please login.", {
          position: "top-center",
          autoClose: 3000
        });
        setTimeout(() => navigate("/login", { state: { emailExists: true } }), 1500);
      } 
    }
  };

  return (
    <div className="fixed inset-0 overflow-auto flex justify-center items-start px-4 py-8">
      <div className="w-full max-w-md mx-auto mt-20 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-6 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold pb-5 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">First Name</label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Last Name</label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full"
          >
            Register
          </button>
        </form>

        <SignInWithGoogle />

        <p className="text-center text-sm mt-4">
          Already registered? <a href="/login" className="underline cursor-pointer">Login Here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;