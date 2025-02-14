import { Alert, useWindowDimensions } from 'react-native';
import { useCallback, useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { intervalToDuration, isBefore } from 'date-fns';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';

import { enableNotifications } from '~/utils/notifications';
import { Storage } from '~/utils/storage';
import { StorageKeys } from '~/constants';
import { PersistedCountdownState } from '~/types/PersistedCountdownState';

// 10 seconds from now
const frequency = 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export const useCounterScreen = () => {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const confettiCannonRef = useRef<ConfettiCannon>(null);
  const { width } = useWindowDimensions();

  const lastCompletedTimestamp = countdownState?.completedAtTimestamps[0];

  const scheduleNotification = useCallback(async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    confettiCannonRef.current?.start();

    let notificationId: string | undefined;
    const status = await enableNotifications();

    if (status === 'granted') {
      notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'The thing is due!',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: new Date(Date.now() + frequency),
        },
      });
    } else {
      Alert.alert(
        'Unable to schedule notification',
        'Please enable notifications to use this feature',
      );
    }

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: notificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };

    setCountdownState(newCountdownState);
    await Storage.set(StorageKeys.COUNTDOWN, newCountdownState);
  }, [countdownState]);

  useEffect(() => {
    const load = async () => {
      const value = await Storage.get<PersistedCountdownState>(
        StorageKeys.COUNTDOWN,
      );
      setCountdownState(value ?? undefined);
    };

    load();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = lastCompletedTimestamp
        ? lastCompletedTimestamp + frequency
        : Date.now();
      const isOverdue = isBefore(timestamp, Date.now());

      if (lastCompletedTimestamp) {
        setIsLoading(false);
      }

      const distance = intervalToDuration(
        isOverdue
          ? { end: Date.now(), start: timestamp }
          : { start: Date.now(), end: timestamp },
      );

      setStatus({ isOverdue, distance });
    }, 1000);

    return () => clearInterval(interval);
  }, [lastCompletedTimestamp]);

  return {
    confettiCannonRef,
    width,
    status,
    isLoading,
    scheduleNotification,
  };
};
