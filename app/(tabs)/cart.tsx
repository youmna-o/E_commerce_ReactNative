import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { UserContext } from "../UserContext";
import ProductCard from "../components/ProductCard";
import { styles } from "../style";
import NonUserPage from "../components/NonUserPage";
import CustomButton from "../components/CustomButton";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export default function cart() {
  const globalUser = useContext(UserContext);
  if (!globalUser) {
    throw new Error("Login must be used within a UserProvider");
  }
  const { user, savedProducts, receipt } = globalUser;
  const [email, setEmail] = useState("");
  const { setReceipt } = globalUser;
  useEffect(() => {
    setEmail(user?.email ? String(user.email) : "");
  }, []);
  return (
    <View style={styles.container}>
      {user?.email ? (
        <View>
          <FlatList
            style={{ marginTop: 16 }}
            data={savedProducts}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              console.log(item.id);
              return <ProductCard product={item} showAddToFavButton={false} />;
            }}
          />
          <View style={{ height: 20, flexDirection: "row" }}>
            <Text
            
              style={{
                fontSize: 18,
                fontWeight: "bold",
                flex: 1,
                alignSelf: "center",
                alignContent: "center",
              }}
            >
              Total:${savedProducts.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </Text>

            <CustomButton
              CustomButtonProps={{
                title: "Checkout",
                onPress: () => {
                  setReceipt(
                    savedProducts.reduce((sum, item) => sum + item.price, 0)
                  );
                  router.push("/checkout");
                },
              }}
            />
          </View>
        </View>
      ) : (
        <NonUserPage title="You must be logged in to see your cart" />
      )}
    </View>
  );
}
