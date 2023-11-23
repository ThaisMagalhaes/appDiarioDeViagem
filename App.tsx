import 'reflect-metadata';
import 'react-native-gesture-handler';
import { useDatabaseInitialize } from 'hooks/useDatabaseInitialize';
import { Text, View, LogBox } from 'react-native';
import { Routes } from './src/routes';
import { RootSiblingParent } from 'react-native-root-siblings';

LogBox.ignoreLogs([
  'Failed prop type:',
  'Key "cancelled" in the image picker',
  'Require cycle: src\\core\\database\\models',
]);

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
    <RootSiblingParent>
      <Routes />
    </RootSiblingParent>
  );
}
