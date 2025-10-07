import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { styles } from "../style";

export interface CustomButtonProps {
  title?: string;
  onPress: () => void;
}

export default function CustomButton({ CustomButtonProps }: any) {
  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 8,
      }}
    >
      <Pressable
        style={{
          backgroundColor: styles.appBlue.color,
          borderRadius: 50,
          height: 40,
          
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={CustomButtonProps.onPress}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {CustomButtonProps.title}
        </Text>
      </Pressable>
    </View>
  );
}
