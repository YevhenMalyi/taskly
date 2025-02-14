import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, FlatList, View } from 'react-native';

import { ShoppingListItem } from '~/components/ShoppingListItem';
import { useShoppingListScreen } from './useShoppingListScreen';
import { styles } from './ShoppingListScreen.styles';

export function ShoppingListScreen() {
  const {
    orderedShoppingItems,
    inputValue,

    setInputValue,
    handleSubmit,
    handleDelete,
    handleToggleCompleted,
  } = useShoppingListScreen();

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={orderedShoppingItems}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your shopping list is empty</Text>
          </View>
        }
        ListHeaderComponent={
          <TextInput
            style={styles.input}
            placeholder="e.g. Coffee"
            value={inputValue}
            onChangeText={setInputValue}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        }
        renderItem={({ item }) => (
          <ShoppingListItem
            onToggleComplete={handleToggleCompleted}
            onDelete={handleDelete}
            {...item}
          />
        )}
        stickyHeaderIndices={[0]}
      />

      <StatusBar style="auto" />
    </>
  );
}
