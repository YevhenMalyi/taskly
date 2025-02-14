import { StyleSheet } from 'react-native';

import { theme } from '~/theme';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  contentContainer: {
    paddingBottom: 16,
  },

  input: {
    borderWidth: 2,
    borderColor: theme.colors.lightGray,
    borderRadius: 16,
    padding: 12,
    marginInline: 12,
    marginBottom: 12,
    fontSize: 18,
    backgroundColor: theme.colors.white,
    height: 48,
    maxHeight: 48,
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
