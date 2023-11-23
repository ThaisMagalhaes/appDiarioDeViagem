import 'reflect-metadata';
import 'react-native-gesture-handler';
import { useDatabaseInitialize } from 'hooks/useDatabaseInitialize';
import { Text, View, LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { Routes } from './src/routes';

LogBox.ignoreLogs(['Failed prop type:']);

export default function App() {
  const { ready } = useDatabaseInitialize();

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
