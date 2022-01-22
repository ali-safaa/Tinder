import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://www.tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[
            tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "20%" },
          ]}
        >
          <Text style={tw("font-bold text-center")}>SignIn With Tinder</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
