import 'reflect-metadata';
import Toast from 'react-native-toast-message';
import { Routes } from './src/routes';
import { useDatabaseInitialize } from './src/hooks/useDatabaseInitialize';
import { View, Text } from 'react-native';

export default function App() {
  const { ready } = useDatabaseInitialize()

  if (!ready) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <Routes />
      <Toast />
    </>
  );
}