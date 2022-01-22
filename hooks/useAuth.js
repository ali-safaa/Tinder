import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
const config = {
  androidClientId:
    "983119372709-kb6b33lq0n3aaba2n1rc3mrd6d5ke45d.apps.googleusercontent.com",
  iosClientId:
    "983119372709-t32oq48e50ti2nh08gm0g8i1oihc91d7.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // logined
          setUser(user);
        } else {
          // not logined
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          // login
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(true));
  };
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
