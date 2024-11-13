import { useLoginGoogleMutation } from "@/redux/auth/api";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginGoogleButton() {
  const { toast } = useToast();
  const [loginGoogle] = useLoginGoogleMutation();
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const login = await loginGoogle(idToken).unwrap();
      if (login) {
        navigate("/all-product");
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error?.message || "There was an error logging in. Please try again.";
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>{errorMessage}</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

  return (
    <Button className='' onClick={loginWithGoogle}>
      Login with google
    </Button>
  );
}
