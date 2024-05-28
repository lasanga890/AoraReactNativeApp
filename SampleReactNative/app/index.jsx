import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { Link } from "expo-router";
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Aora</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Goto profile
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
