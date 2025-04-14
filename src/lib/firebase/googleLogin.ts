import {
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { API_URL, ENV, DOMAIN_URL } from "@/constants/urls";
import API from "@/lib/axios/instance";
import { SignOut } from "@/lib/firebase/emailAndPasswordAuth";

const loginWithGoogle = async (): Promise<any> => {
  try {
    await SignOut(); // Sign out the user before signing in with Google

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) {
      throw new Error("No user found after signing in with Google.");
    }

    const accessToken = await user.getIdToken();

    if (!user.emailVerified) {
      await sendEmailVerification(user, {
        url: `${DOMAIN_URL[ENV]}/login?uid=${user.uid}&email=${user.email}&accessToken=${accessToken}`,
      });
    }

    const response = await API.post(
      `${API_URL[ENV]}/auth/continue-with-social-account`,
      { accessToken }
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during Google login.");
  }
};

export default loginWithGoogle;
