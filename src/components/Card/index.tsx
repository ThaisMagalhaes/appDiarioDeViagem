import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

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
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.title}>
          <Text numberOfLines={1} ellipsizeMode='tail'>
            Local: {viagem.local}
          </Text>
          <Text style={styles.Data} numberOfLines={1} ellipsizeMode='tail'>
            Data: {viagem.data}
          </Text>
          {viagem.finalizado ? (
            <Text style={styles.finalizado} numberOfLines={1} ellipsizeMode='tail'>Finalizado</Text>
          ) : (
            <Text style={styles.finalizado} numberOfLines={1} ellipsizeMode='tail'>Aberto</Text>
          )}
        </View>
      </View>
      {viagem.finalizado ? (
        <View style={styles.button}>
          <TouchableOpacity onPress={onPressUpdate}>
            <MaterialIcons name="visibility" size={22} color="#6448B7" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.button}>
          <TouchableOpacity onPress={onPressUpdate}>
            <MaterialIcons name="mode-edit" size={22} color="#6448B7" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.button}>
        <TouchableOpacity onPress={showDeleteConfirmation}>
          <MaterialIcons name="delete" size={22} color="#6448B7" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

