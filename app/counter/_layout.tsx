import { Link, Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { theme } from "../../theme";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => {
            return (
              <Link href="/counter/history" asChild>
                <Pressable hitSlop={20}>
                  <MaterialCommunityIcons
                    name="history"
                    size={32}
                    color={theme.colorBlack}
                  />
                </Pressable>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
