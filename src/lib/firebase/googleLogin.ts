import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { API_URL, ENV } from "@/constants/urls";
import API from "@/lib/axios/instance";
import { SignOut } from "@/lib/firebase/emailAndPasswordAuth";

const loginWithGoogle = async () => {
  await SignOut(); // Sign out the user before signing in with Google
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  await signInWithPopup(auth, provider)
    .then(async () => {   
      const user = auth.currentUser;
      const accessToken = await user?.getIdToken().then((accessToken) => {
        return accessToken;
      });
      const response = await API.post(`${API_URL[ENV]}/auth/continue-with-social-account`, {
        accessToken,
      });
      if (response?.data?.success) {
        console.log(response?.data);
        return response?.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default loginWithGoogle;
