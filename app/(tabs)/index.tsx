import { View, Text, Button, FlatList } from "react-native";
import { Link, router } from "expo-router";
import { use, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, User } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../style";
export default function Home() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { user } = globalUser;
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(user?.email ? String(user.email) : "");
  }, []);

  const [productsList, setProductsList] = useState<Product[]>([]);
  const getProductsFromApi =  () => {
  return fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(json => {
      setProductsList(json.products);
      return json.products;
    })
    .catch(error => {
      console.error(error);
    });
};

 useEffect(() => {
  getProductsFromApi();
 },[])
  return (
   <SafeAreaView style={styles.container} >  
   <FlatList 
    data={productsList}
  renderItem={({ item }) =>{
    console.log(item.id);
    return (
      <Text>{item.title}</Text>
    );
  }}
   />
   </SafeAreaView>
  );
}
