import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  viagem: {
    id: number;
    local: string;
    data: string;
    finalizado: boolean;
  };
  onPressDelete: () => void;
  onPressUpdate: () => void;
};

export function Card({ viagem, onPressDelete, onPressUpdate }: Props) {
  const showDeleteConfirmation = () => {
    Alert.alert(
      'Alerta',
      `Tem certeza de que deseja excluir a viagem de código ${viagem.id}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: onPressDelete, // Chama a função onPressDelete se o usuário confirmar a exclusão
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <View className="mb-2 h-20 w-full flex-row items-center rounded border border-slate-200 bg-slate-200 pl-3">
      <View className="flex-1 rounded-xl pl-1 pr-28">
        <View className="w-40 pr-10 text-lg font-bold text-slate-400">
          <Text numberOfLines={1} ellipsizeMode="tail">
            Local: {viagem.local}
          </Text>
          <Text className="pr-10 text-sm text-slate-400" numberOfLines={1} ellipsizeMode="tail">
            Data: {viagem.data}
          </Text>
          {viagem.finalizado ? (
            <Text className="pr-10 text-base font-bold text-roxo" numberOfLines={1} ellipsizeMode="tail">
              Finalizado
            </Text>
          ) : (
            <Text className="pr-10 text-base font-bold text-roxo" numberOfLines={1} ellipsizeMode="tail">
              Aberto
            </Text>
          )}
        </View>
      </View>
      {viagem.finalizado ? (
        <View className="h-20 w-20 items-center justify-center border-l border-l-slate-200">
          <TouchableOpacity onPress={onPressUpdate}>
            <MaterialIcons name="visibility" size={22} color="#6448B7" />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="h-20 w-20 items-center justify-center border-l border-l-slate-200">
          <TouchableOpacity onPress={onPressUpdate}>
            <MaterialIcons name="mode-edit" size={22} color="#6448B7" />
          </TouchableOpacity>
        </View>
      )}
      <View className="h-20 w-20 items-center justify-center border-l border-l-slate-200">
        <TouchableOpacity onPress={showDeleteConfirmation}>
          <MaterialIcons name="delete" size={22} color="#6448B7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
