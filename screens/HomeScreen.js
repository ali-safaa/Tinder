import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Button
        onPress={() => navigation.navigate("Chat")}
        title="click to chat"
      />
      <Button title="logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default HomeScreen;
