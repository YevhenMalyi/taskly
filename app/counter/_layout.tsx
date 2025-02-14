import { TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { theme } from '~/theme';

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Counter',
          headerRight: () => {
            return (
              <TouchableOpacity
                onPressOut={() => router.push('/counter/history')}
              >
                <MaterialIcons
                  name="history"
                  size={32}
                  color={theme.colors.gray}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Stack.Screen name="history" options={{ title: 'History' }} />
    </Stack>
  );
}
