import Toast from "react-native-toast-message";
import { Routes } from "./src/routes";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Routes />
      <Toast />
    </>
  );
}
