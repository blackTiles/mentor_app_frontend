import {
  signInWithPopup,
  OAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import API from "@/lib/axios/instance";
import { API_URL, ENV, DOMAIN_URL } from "@/constants/urls";
import { SignOut } from "@/lib/firebase/emailAndPasswordAuth";

const loginWithMicrosoft = async (): Promise<any> => {
  try {
    await SignOut(); // Sign out the user before signing in with Microsoft

    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({ prompt: "select_account" });

    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    if (!user) {
      throw new Error("No user is currently signed in.");
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
    throw new Error(error.message || "An error occurred during login.");
  }
};

export default loginWithMicrosoft;
