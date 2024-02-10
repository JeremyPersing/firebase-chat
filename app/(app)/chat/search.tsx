import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { TextInput, Text } from "react-native-paper";
import {
  FlatList,
  Keyboard,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchScreen() {
  const auth = getAuth();
  const db = getFirestore();
  const { top } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const getSearchResults = async (text: string) => {
    text = text.toLowerCase();

    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("email", ">=", text),
      where("email", "<=", text + "\uf8ff"),
      where("email", "!=", auth.currentUser?.email)
    );
    const res = await getDocs(q);
    if (res) {
      let users: any[] = [];
      res.docs.forEach((doc) => users.push(doc.data()));
      return users;
    }

    return [];
  };

  useEffect(() => {
    async function fetchUsers() {
      setUsers(await getSearchResults(searchQuery));
    }

    fetchUsers();
  }, [searchQuery]);

  const handleSubmit = async (text: string) => {
    setUsers(await getSearchResults(text));
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: top }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Pressable
          style={{ paddingLeft: 10, marginRight: 15 }}
          onPress={() => router.back()}
        >
          {({ pressed }) => (
            <FontAwesome
              name="chevron-left"
              size={25}
              color={"white"}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>

        <TextInput
          mode={"outlined"}
          returnKeyType="search"
          placeholder="Search Users ..."
          autoFocus
          dense
          style={{ width: "75%" }}
          onChangeText={setSearchQuery}
          onSubmitEditing={async (e) => {
            await handleSubmit(e.nativeEvent.text);
          }}
        />
      </View>

      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        {searchQuery ? (
          <>
            {users.length === 0 ? (
              <View
                style={{
                  flex: 0.75,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                  No Users Found
                </Text>
              </View>
            ) : (
              <FlatList
                style={{ marginTop: 10 }}
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 20,
                      paddingHorizontal: 10,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                    }}
                    onPress={() =>
                      router.navigate({
                        pathname: "/chat/[id]",
                        params: {
                          id: item._id,
                          email: item.email,
                        },
                      })
                    }
                  >
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                      {item.email}
                    </Text>
                  </Pressable>
                )}
              />
            )}
          </>
        ) : (
          <View
            style={{
              flex: 0.75,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
              Search Users by Email
            </Text>
          </View>
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
