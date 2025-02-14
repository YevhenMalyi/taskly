import { Text, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import { PersistedCountdownState } from '~/types/PersistedCountdownState';
import { StorageKeys } from '~/constants';
import { Storage } from '~/utils/storage';
import { styles } from './CounterHistoryScreen.styles';

const FULL_DATE_FORMAT = 'LLL d yyyy, h:mm aaa';

export function CounterHistoryScreen() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const load = async () => {
      const countdownState = await Storage.get<PersistedCountdownState>(
        StorageKeys.COUNTDOWN,
      );
      setCountdownState(countdownState ?? undefined);
    };

    load();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={countdownState?.completedAtTimestamps ?? []}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No history</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{format(item, FULL_DATE_FORMAT)}</Text>
        </View>
      )}
    />
  );
}
