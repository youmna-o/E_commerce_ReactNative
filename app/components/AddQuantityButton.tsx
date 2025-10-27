import { Pressable, View, StyleSheet ,Text} from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../style";

export default function AddQuantityButton() {
  return (
    <View style={style.container}>
      <Pressable style={style.MyButton} onPress={() => {}}>
        <Button mode="outlined">-</Button>
      </Pressable>
    <Text> 1</Text>
      <Pressable style={style.MyButton} onPress={() => {}}>
        <Button mode="outlined">+</Button>
      </Pressable>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
    gap: 20, // Space between buttons
  },
  MyButton: {
    borderRadius: 50,
    height: 40,
    width: 50, // Increased from 10 to 50
    justifyContent: "center",
    alignItems: "center",
  },
});
