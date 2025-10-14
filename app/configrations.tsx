import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Platform,
} from "react-native";
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

const cartItems: BillItems[] = [
  {
    itemId: "item1",
    description: "Item 1 Description",
    quantity: "1",
    price: "300",
  },
  {
    itemId: "item2",
    description: "Item 2 Description",
    quantity: "1",
    price: "200",
  },
  {
    itemId: "item3",
    description: "Item 3 Description",
    quantity: "1",
    price: "500",
  },
];

const merchant: MerchantInfo = {
  merchantCode: "YOUR MERCHANT CODE",
  merchantSecretCode: "YOUR SECRET CODE",
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
