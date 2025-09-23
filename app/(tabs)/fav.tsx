import { router } from "expo-router";
import { View , Text, Button} from "react-native";


export default function Fav() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow"
      }}
    >
      <Text>Faaaaaav</Text>
            <Button title="Go to Details" onPress={() => router.push("./components/Login")} />

    </View>
  );
}