import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { styles } from "../style";
import CustomOptionCard from "../components/CustomOptionCard";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../UserContext";
import NoNUserPage from "../components/NonUserPage";

export default function profile() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { user } = globalUser;
  const { logout } = globalUser;
  return (
    <View style={styles.container}>
      {user?.email ? (
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={180}
              color={styles.appBlue.color}
            />
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#0045fe",
                textAlign: "center",
                padding: 10,
              }}
            >
              {user?.email}
            </Text>
          </View>

          <CustomOptionCard
            title="Log Out"
            onPress={logout}
            iconName="log-out-outline"
          />
        </View>
      ) : (
        <NoNUserPage title="You must be logged in to have profile page" />
        
      )}
    </View>
  );
}
