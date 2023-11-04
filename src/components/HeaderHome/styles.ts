import { StyleSheet, Text, View } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 178,
    backgroundColor: '#6448B7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 4,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    flex: 1,
    marginLeft: 12
  },
  title: {
    color: '#FFF',
    fontSize: 20
  },
});