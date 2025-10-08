import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "../style";

export interface OptionCardPorpos {
  title: string;
  onPress: () => void;
    iconName: keyof typeof Ionicons.glyphMap;
}
export default function CustomOptionCard({
  title,
  onPress,
  iconName,
}: OptionCardPorpos) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderColor: styles.appBlue.color,
        borderRadius: 16,
      }}
    >
      <Ionicons name={iconName } size={24} color={styles.appBlue.color} />
      <Text style={{ fontSize: 18, marginLeft: 8  ,     fontWeight: 'bold',
}}> {title} </Text>
    </Pressable>
  );
}
