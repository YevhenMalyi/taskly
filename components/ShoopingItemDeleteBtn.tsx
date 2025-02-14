import { TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { theme } from '../theme';

type Props = {
  onDelete: () => void;
  name: string;
  isCompleted?: boolean;
};

export function ShoppingItemDeleteBtn({ onDelete, name, isCompleted }: Props) {
  const handlePress = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      'This action cannot be undone',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: onDelete,
        },
      ],
    );
  };

  const iconColor = isCompleted ? theme.colors.gray : theme.colors.red;

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <AntDesign name="closecircle" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}
