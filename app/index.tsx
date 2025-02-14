import { Platform, UIManager } from 'react-native';

import { ShoppingListScreen } from '~/screens/ShoppingListScreen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  return <ShoppingListScreen />;
}
