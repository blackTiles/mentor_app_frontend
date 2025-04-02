import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import API from "@/lib/axios/instance";
import { API_URL, ENV } from "@/constants/urls";

const loginWithMicrosoft = async () => {
  const provider = new OAuthProvider("microsoft.com");
  provider.setCustomParameters({
    prompt: "select_account",
  });
  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      // const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential?.accessToken;
      // const idToken = credential?.idToken;
      // return {
      //   accessToken,
      //   idToken,
      // };
    })
    .catch((error) => {
      console.error(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      return {
        errorCode,
        errorMessage,
      };
    });
};

export default loginWithMicrosoft;
