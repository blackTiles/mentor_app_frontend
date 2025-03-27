import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import app from "@/lib/firebase/config";

const loginWithMicrosoft = async () => {
  const provider = new OAuthProvider("microsoft.com");

  const auth = getAuth();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  await signInWithPopup(auth, provider)
    .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.
      console.log(result);
      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const idToken = credential?.idToken;
    })
    .catch((error) => {
      // Handle error.
      console.log(error);
    });
};

export default loginWithMicrosoft;