import { SafeAreaView, View } from "react-native";
import { router } from "expo-router";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LandingScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          paddingTop: 50 + top,
        }}
        variant="titleLarge"
      >
        React Native Firebase Chat
      </Text>

      <View style={{ paddingBottom: 50 }}>
        <Button
          style={{ marginBottom: 10 }}
          mode="elevated"
          onPress={() => router.push("/login")}
        >
          Sign In
        </Button>
        <Button
          style={{ marginBottom: 10 }}
          mode="contained"
          onPress={() => router.push("/register")}
        >
          Create Account
        </Button>
      </View>
    </SafeAreaView>
  );
}
