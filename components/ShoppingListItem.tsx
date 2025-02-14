import { Pressable, StyleSheet, Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { theme } from '~/theme';
import { ShoppingItemDeleteBtn } from './ShoopingItemDeleteBtn';
import { ShoppingItem } from '~/types/ShoppingItem';

type Props = ShoppingItem & {
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
};

export function ShoppingListItem({
  id,
  name,
  isCompleted = false,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleToggleComplete = () => {
    onToggleComplete(id);
  };

  return (
    <Pressable
      onPress={handleToggleComplete}
      style={[styles.item, isCompleted && styles.isCompleted]}
    >
      <View style={styles.textContainer}>
        <Entypo
          name={isCompleted ? 'check' : 'circle'}
          size={24}
          color={isCompleted ? theme.colors.gray : theme.colors.cerulian}
        />

        <Text
          style={[styles.itemText, isCompleted && styles.itemTextCompleted]}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>

      <ShoppingItemDeleteBtn
        onDelete={handleDelete}
        name={name}
        isCompleted={isCompleted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.cerulian,
    paddingInline: 16,
    paddingBlock: 16,
  },

  isCompleted: {
    textDecorationLine: 'line-through',
    backgroundColor: theme.colors.lightGray,
    borderBottomColor: theme.colors.lightGray,
  },

  itemText: {
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
  },

  itemTextCompleted: {
    textDecorationLine: 'line-through',
    textDecorationColor: theme.colors.gray,
    color: theme.colors.gray,
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    flex: 1,
  },
});
