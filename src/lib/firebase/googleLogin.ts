import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "@/lib/firebase/config";

const loginWithGoogle = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default loginWithGoogle;
