import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import googleLogo from "../assets/google.png";

function SignInWithGoogle() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "Users", user.uid));

      if (isLoginPage && !userDoc.exists()) {
        await auth.signOut();
        toast.error("No account found. Please register first.", {
          position: "top-center"
        });
        return;
      }

      if (!isLoginPage && !userDoc.exists()) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          photo: user.photoURL,
        });
      }

      toast.success(`Signed in successfully as ${user.email}`, {
        position: "top-center"
      });
      window.location.href = "/dashboard";

    } catch (error) {
      toast.error("Error signing in: " + error.message, {
        position: "top-center"
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center my-4">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="px-4 text-sm text-gray-300">
          or {isLoginPage ? "login" : "sign up"} with
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <div
        className="flex justify-center items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg border border-gray-400 hover:bg-gray-700"
        onClick={googleLogin}
        role="button"
        tabIndex={0}
      >
        <img 
          src={googleLogo} 
          alt="Google logo" 
          className="w-8 h-8" 
        />
        <span className="text-sm font-medium">
          {isLoginPage ? "Login with Google" : "Sign up with Google"}
        </span>
      </div>
    </div>
  );
}

export default SignInWithGoogle;