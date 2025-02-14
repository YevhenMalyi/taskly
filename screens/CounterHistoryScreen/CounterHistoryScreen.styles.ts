import { StyleSheet } from 'react-native';
import { theme } from '~/theme';

export const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: theme.colors.white },

  contentContainer: { marginTop: 8 },

  item: {
    backgroundColor: theme.colors.lightGray,
    marginInline: 8,
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },

  text: {
    fontSize: 18,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBlock: 18,
  },

  emptyText: {
    fontSize: 18,
  },
});
