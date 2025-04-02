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
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      const user = auth.currentUser;
      await updateProfile(user!, {
        displayName: name,
      });
      const accessToken = await user?.getIdToken().then((accessToken) => {
        return accessToken;
      });
      const response = await API.post(`${API_URL[ENV]}/auth/signup`, {
        name,
        role,
        accessToken,
      });
      if (response?.data?.success && user) {
        await sendEmailVerification(user, {
          url: `${DOMAIN_URL[ENV]}/login?uid=${user.uid}&email=${user.email}&accessToken=${accessToken}`,
        });
      }
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      throw new Error(errorMessage || error);
    });
};

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      const user = auth.currentUser;
      const accessToken = await user?.getIdToken().then((accessToken) => {
        return accessToken;
      });
      if (user && !user.emailVerified) {
        await sendEmailVerification(user, {
          url: `${DOMAIN_URL[ENV]}/login?uid=${user.uid}&email=${user.email}&accessToken=${accessToken}`,
        });
      }
      const response = await API.post(`${API_URL[ENV]}/auth/login`, {
        accessToken,
      });
      if (response?.data?.success) {
        console.log(response?.data);
        return response?.data;
      }
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
};

export const SignOut = async () => {
  await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const errorMessage = error.message;
      throw new Error(errorMessage);
    });
};
