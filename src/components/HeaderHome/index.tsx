import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

export function HeaderHome() {
  const navigation = useNavigation();

  function handleAdd() {
    navigation.navigate('Form', {});
  }

  return (
    <View className="h-[178px] w-full flex-row items-center justify-between bg-roxoP px-6">
      <View>
        <Text className="text-xl font-bold text-zinc-100">
          Diário de Viagem App Pós
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleAdd}
        className="h-14 w-14 items-center justify-center rounded border border-zinc-100"
      >
        <MaterialIcons name="add" size={32} color={colors.zinc[100]} />
      </TouchableOpacity>
    </View>
  );
}
