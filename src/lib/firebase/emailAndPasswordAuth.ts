import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import API from "@/lib/axios/instance";
import { ENV, DOMAIN_URL, API_URL } from "@/constants/urls";
import { auth } from "@/lib/firebase/config";

export const SignUp = async (
  name: string,
  role: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    await SignOut();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      await updateProfile(user, { displayName: name });

      const accessToken = await user.getIdToken();

      const response = await API.post(`${API_URL[ENV]}/auth/signup`, {
        name,
        role,
        accessToken,
      });

      if (response?.data?.success) {
        await sendEmailVerification(user, {
          url: `${DOMAIN_URL[ENV]}/login?uid=${user.uid}&email=${user.email}&accessToken=${accessToken}`,
        });
      }

      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.message || error);
  }
};

export const SignIn = async (email: string, password: string): Promise<any> => {
  try {
    await SignOut();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      const accessToken = await user.getIdToken();

      if (!user.emailVerified) {
        await sendEmailVerification(user, {
          url: `${DOMAIN_URL[ENV]}/login?uid=${user.uid}&email=${user.email}&accessToken=${accessToken}`,
        });
      }

      const response = await API.post(`${API_URL[ENV]}/auth/login`, {
        accessToken,
      });

      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.message || error);
  }
};

export const SignOut = async () => {
  await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      throw new Error(error.message || error);
    });
};
