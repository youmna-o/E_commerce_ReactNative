import { Text, View } from "react-native";
import React, { Component, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { RadioButton } from "react-native-paper";
import CustomButton from "./components/CustomButton";
import { UserContext } from "./UserContext";
import { Link, router } from "expo-router";

export default function Checkout() {
   const globalUser = useContext(UserContext);
    if (!globalUser) {
      throw new Error("Login must be used within a UserProvider");
    }
    const { user, savedProducts, receipt } = globalUser;
   const { setReceipt } = globalUser;
  const [checked, setIsChecked] = useState("");


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={[styles.miniTitle, { paddingLeft: 0, marginBottom: 20 }]}>
        Payment Methods
      </Text>
      <RadioButton.Group
        onValueChange={(value) => setIsChecked(value)}
        value={checked}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <RadioButton value="Cash" />
          <Text style={{ marginLeft: 8, fontSize: 16 }}>Cash</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <RadioButton value="Visa" />
          <Text style={{ marginLeft: 8, fontSize: 16 }}>Visa</Text>
        </View>
         <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <RadioButton value="Fawry" />
          <Text style={{ marginLeft: 8, fontSize: 16 }}>Fawry</Text>
        </View>
      </RadioButton.Group>
        <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                flex: 1,
                alignSelf: "center",
                alignContent: "center",
              }}
            >
              Total:${savedProducts.reduce((sum, item) => sum + item.price, 0)}
            </Text>
      <CustomButton
                    CustomButtonProps={{
                      title: "Checkout",
                      onPress: () => {
                       ////TODO: integrate payment gateway
                        
                      },
                    }}
                  />
      
    </View>
  );
}

//
