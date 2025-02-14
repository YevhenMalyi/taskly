import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, LayoutAnimation } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ShoppingItem } from '~/types/ShoppingItem';
import { Storage } from '~/utils/storage';
import { orderShoppingList } from '~/utils/shopping-list';
import { StorageKeys } from '~/constants';

export const useShoppingListScreen = () => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  const orderedShoppingItems = useMemo(
    () => orderShoppingList(shoppingItems),
    [shoppingItems],
  );

  const handleSubmit = useCallback(() => {
    if (inputValue) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      setShoppingItems((prev) => {
        const newItem = {
          id: new Date().toISOString(),
          name: inputValue,
          isCompleted: false,
          updatedAtTimestamp: Date.now(),
        };

        const updatedList = [...prev, newItem];
        Storage.set(StorageKeys.SHOPPING_LIST, updatedList);
        return updatedList;
      });

      setInputValue('');
    } else {
      Alert.alert('Please enter a value');
    }
  }, [inputValue]);

  const handleDelete = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setShoppingItems((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      Storage.set(StorageKeys.SHOPPING_LIST, updatedList);
      return updatedList;
    });
  }, []);

  const handleToggleCompleted = useCallback((id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setShoppingItems((prev) => {
      const updatedList = prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.isCompleted) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }

        return {
          ...item,
          isCompleted: !item.isCompleted,
          completedAtTimestamp: item.completedAtTimestamp ? null : Date.now(),
          updatedAtTimestamp: Date.now(),
        };
      });

      Storage.set(StorageKeys.SHOPPING_LIST, updatedList);
      return updatedList;
    });
  }, []);

  useEffect(() => {
    const load = async () => {
      const shoppingItems = await Storage.get<ShoppingItem[]>(
        StorageKeys.SHOPPING_LIST,
      );

      if (shoppingItems) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingItems(shoppingItems);
      }
    };

    load();
  }, []);

  return {
    orderedShoppingItems,
    inputValue,

    setInputValue,
    handleSubmit,
    handleDelete,
    handleToggleCompleted,
  };
};
