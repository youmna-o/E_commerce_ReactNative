import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { router } from "expo-router";
import { CustomTextInput } from "../components/CustomTextInput";
import { styles } from "../style";
import CustomAuthImage from "../components/CustomAuthImage";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { setUser } = globalUser;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.pageTitle}> Welcom To Login </Text>

        <CustomAuthImage></CustomAuthImage>
        <CustomTextInput
          label="Email"
          placeholder={"Enter Your Email"}
          value={email}
          onChangeText={(input) => setEmail(input)}
        />
        <CustomTextInput
          label="Password"
          placeholder={"Enter Your Password"}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
        <Text>{email}</Text>
        <CustomButton
          CustomButtonProps={{
            title: "Login",
            onPress: async () => {
              const myObject = { email, name, phone, password, isLogIn: true };
              setUser(myObject);
              await AsyncStorage.setItem("user", JSON.stringify(myObject));
              router.push("/(tabs)");
            },
          }}
        />
        <Pressable
          onPress={() => {
            router.push("/auth/Register");
          }}
        >
          <Text
            style={{
              color: styles.appBlue.color,
              fontSize: 20,
              fontWeight: "bold",
              paddingLeft: "60%",
            }}
          >
            {" "}
            Sign Up{" "}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
