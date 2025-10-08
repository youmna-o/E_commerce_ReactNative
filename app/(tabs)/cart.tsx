import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { UserContext } from "../UserContext";
import ProductCard from "../components/ProductCard";
import { styles } from "../style";
import NoNUserPage from "../components/NonUserPage";

export default function cart() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { user } = globalUser;
  const { savedProducts } = globalUser;
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(user?.email ? String(user.email) : "");
  }, []);
  return (
    <View style={styles.container}>
      {user?.email ? (
        <FlatList
          style={{ marginTop: 16 }}
          data={savedProducts}
          numColumns={2}
          renderItem={({ item }) => {
            console.log(item.id);
            return <ProductCard product={item} showAddToFavButton={false} />;
          }}
        />
      ) : (
       <NoNUserPage title="You must be logged in to see your cart" />
      )}
    </View>
  );
}
