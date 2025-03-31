import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import API from "@/lib/axios/instance";
import { ENV, DOMAIN_URL } from "@/constants/urls";
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
        console.log(user);
        console.log("User Access Token ", accessToken);
      });
      if (user) {
        sendEmailVerification(user, {
          url: `${DOMAIN_URL[ENV]}/login?uid=${user.uid}&email=${user.email}&accessToken=${accessToken}`,
        }).then(() => {
          // Email verification sent!
          console.log("Email Verification sent! Check your mail box");
        });
      }
      return user;
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      return new Error(errorMessage);
    });
};

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      return new Error(errorMessage);
    });
};

export const SignOut = async () => {
  await signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return new Error(errorMessage);
    });
};
