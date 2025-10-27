import { Platform, Text, View } from "react-native";
import React, { Component, useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./style";
import { RadioButton } from "react-native-paper";
import CustomButton from "./components/CustomButton";
import { UserContext } from "./UserContext";

import {
  startPayment,
  openCardsManager,
  addFawryListener,
  FawryEvents,
} from "@fawry_pay/rn-fawry-pay-sdk";
// Import types from the types file since they're not re-exported from index
import type {
  BillItems,
  MerchantInfo,
  CustomerInfo,
  FawryLaunchModel,
  FawryLanguages,
} from "@fawry_pay/rn-fawry-pay-sdk/src/types";
import uuid from "react-native-uuid";




export default function Checkout() {
   const globalUser = useContext(UserContext);
    if (!globalUser) {
      throw new Error("Login must be used within a UserProvider");
    }
    const { user, savedProducts, receipt } = globalUser;
   const { setReceipt } = globalUser;
  const [checked, setIsChecked] = useState("Cash");
  const removeListenerRef = useRef<(() => void) | null>(null);

const cartItems: BillItems[] =  
savedProducts.map((item) => ({
  itemId: item.id.toString(),
    description: item.description,
     quantity: "1",
     price: item.price.toString(),

}))


const merchant: MerchantInfo = {
merchantCode: Platform.OS === 'android'
    ? '+/IAAY2notgLsdUB9VeTFg=='
    : '+/IAAY2nothN6tNlekupwA==',
  merchantSecretCode: Platform.OS === 'android'
    ? '69826c87-963d-47b7-8beb-869f7461fd93'
    : '4b815c12-891c-42ab-b8de-45bd6bd02c3d',
  merchantRefNum: uuid.v4().toString(),  
};

const customer: CustomerInfo = {
  customerName: "Ahmed Kamal",
  customerMobile: "+1234567890",
  customerEmail: "ahmed.kamal@example.com",
  customerProfileId: "12345",
};

const fawryConfig: FawryLaunchModel = {
  baseUrl: "https://atfawry.fawrystaging.com/",
  lang: "ENGLISH" as FawryLanguages,
  signature: "",
  allow3DPayment: false,
  skipReceipt: false,
  skipLogin: true,
  payWithCardToken: true,
  authCaptureMode: false,
  allowVoucher: true,
  items: cartItems,
  merchantInfo: merchant,
  customerInfo: customer,
};

 useEffect(() => {
    removeListenerRef.current = addFawryListener((eventName, payload) => {
      try {
        const parsed = isValidJson(payload) ? JSON.parse(payload) : payload;

        switch (eventName) {
          case FawryEvents.EVENT_PAYMENT_COMPLETED:
            console.log("Payment completed:", parsed);
            // TODO: show success screen / update UI
            break;

          case FawryEvents.EVENT_ON_SUCCESS:
            console.log("Payment success:", parsed);
            break;

          case FawryEvents.EVENT_ON_FAIL:
            console.log("Payment failed:", parsed);
            break;

          case FawryEvents.EVENT_READY:
            console.log("SDK Ready");
            break;

          default:
            console.log(`Unhandled event: ${eventName}`, parsed);
        }
      } catch (e) {
        console.error(`Event parsing error for ${eventName}:`, e);
        console.warn(`Raw payload: ${payload}`);
      }
    });



    // Cleanup listener when screen unmounts
    return () => {
      removeListenerRef.current?.();
    };
  }, []);


    const handlePayment = () => {
    const updatedMerchant = {
      ...merchant,
      merchantRefNum: uuid.v4().toString(), // always generate new one
    };
    startPayment({
      ...fawryConfig,
      merchantInfo: updatedMerchant,
    });
  };

  const isValidJson = (payload: string): boolean => {
    try {
      JSON.parse(payload);
      return true;
    } catch {
      return false;
    }
  };


    const total = savedProducts.reduce((sum, item) => sum + item.price, 0);

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
         
          <RadioButton value="Fawry" />
          <Text style={{ marginLeft: 8, fontSize: 16 }}> Fawry Services </Text>
        </View>
      </RadioButton.Group>
        <Text
             style={{
                  paddingHorizontal: 40,
                  fontSize: 20,
                  fontWeight: "bold",
                  flex: 1,
                  alignSelf: "center",
                  alignContent: "center",
                  color: styles.appBlue.color,
                }}
            >
              Total:${total.toFixed(2)}
            </Text>
      <CustomButton
                    CustomButtonProps={{
                      title: "Confirm Payment",
                      onPress: () => {
            if (checked === "Fawry") {
              handlePayment();
            } else {
              console.log(`Selected payment: ${checked}`);
            }
                      },
                    }}
                  />
      
    </View>
  );
}

//
