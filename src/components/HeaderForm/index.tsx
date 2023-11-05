import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from './styles';

type Props = {
  title: string;
};

export function HeaderForm({ title, ...rest }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <MaterialIcons
          name="chevron-left"
          size={32}
          color="#FFF"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}
