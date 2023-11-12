import * as SplashScreen from 'expo-splash-screen';
import Toast from 'react-native-toast-message';
import { Routes } from './src/routes';
import { AnimatedSplashScreen } from './src/screens/Splash/index';

void SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
  return (
    <AnimatedSplashScreen>
      <Routes />
      <Toast />
    </AnimatedSplashScreen>
  );
}
