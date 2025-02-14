import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

import { theme } from '~/theme';
import { TimeSegment } from '~/components/TimeSegment';
import { useCounterScreen } from './useCounterScreen';
import { styles } from './CounterScreen.styles';

export function CounterScreen() {
  const { confettiCannonRef, width, status, isLoading, scheduleNotification } =
    useCounterScreen();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.black} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerOverdue : {},
      ]}
    >
      <Text style={[styles.heading, status.isOverdue ? styles.whiteText : {}]}>
        {status.isOverdue ? 'Thing overdue by' : 'Thing due in...'}
      </Text>

      <View style={styles.row}>
        <TimeSegment
          number={status.distance.days ?? 0}
          unit="Days"
          textStyle={status.isOverdue ? styles.whiteText : {}}
        />
        <TimeSegment
          number={status.distance.hours ?? 0}
          unit="Hours"
          textStyle={status.isOverdue ? styles.whiteText : {}}
        />
        <TimeSegment
          number={status.distance.minutes ?? 0}
          unit="Minutes"
          textStyle={status.isOverdue ? styles.whiteText : {}}
        />
        <TimeSegment
          number={status.distance.seconds ?? 0}
          unit="Seconds"
          textStyle={status.isOverdue ? styles.whiteText : {}}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>I've done a thing!</Text>
      </TouchableOpacity>

      <ConfettiCannon
        ref={confettiCannonRef}
        count={200}
        origin={{ x: width / 2, y: 0 }}
        autoStart={false}
        fadeOut
      />
    </View>
  );
}
