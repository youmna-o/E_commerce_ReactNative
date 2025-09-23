import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { styles } from "../style";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

export interface CustomButtonProps {
  title?: string;
  onPress: () => void;
}

export default function CustomButton({ CustomButtonProps }: any) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          backgroundColor: styles.appBlue.color,
          borderRadius: 10,
          height: 50,
          padding: 10,
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={CustomButtonProps.onPress}
      >
        <Text style={{ color: "white", fontWeight: "bold" ,     
           fontSize: 20,
}}>
          {CustomButtonProps.title}
        </Text>
      </Pressable>
    </View>
  );
}
