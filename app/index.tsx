import { StyleSheet, FlatList, TextInput, Text, View } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    setShoppingList([
      ...shoppingList,
      {
        id: String(shoppingList.length + 1),
        name: value,
        lastUpdatedTimestamp: Date.now(),
      },
    ]);
    setValue("");
  };

  const handleDelete = (id: string) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setShoppingList(
      shoppingList.map((item) =>
        item.id === id
          ? {
              ...item,
              lastUpdatedTimestamp: Date.now(),
              completedAtTimestamp: item.completedAtTimestamp
                ? undefined
                : Date.now(),
            }
          : item,
      ),
    );
  };

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      stickyHeaderIndices={[0]}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty. Start adding items!</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          placeholder="E.g. Coffee"
          style={styles.textInput}
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimestamp)}
        />
      )}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingVertical: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    padding: 12,
    margin: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    fontSize: 18,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    marginVertical: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
