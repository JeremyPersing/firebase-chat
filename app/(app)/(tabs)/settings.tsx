import { View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { Button, Text } from "react-native-paper";

export default function SettingsScreen() {
  const auth = getAuth();

  const logoutUser = () => {
    signOut(auth);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ fontWeight: "bold", paddingBottom: 20 }}
        variant="titleLarge"
      >
        Your Account
      </Text>
      <Text>{auth.currentUser?.email}</Text>
      <Button mode="contained" style={{ marginTop: 20 }} onPress={logoutUser}>
        Sign Out
      </Button>
    </View>
  );
}
