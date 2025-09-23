import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import Login from "./auth/Login";
import { UserContext } from "./UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { user, loading } = globalUser;
  const [storedEmail, setStoredEmail] = useState("");

  useEffect(() => {
    const loadStoredEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        setStoredEmail(email || "");
      } catch (error) {
        console.log("Error loading email:", error);
      }
    };
    loadStoredEmail();
  }, []);

  useEffect(() => {
    if (!loading && (user?.isLogIn || storedEmail)) {
      router.replace("/(tabs)");
    }
  }, [loading, user?.isLogIn, storedEmail]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <Login />;
}
