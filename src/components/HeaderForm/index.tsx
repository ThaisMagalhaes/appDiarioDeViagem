import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from 'tailwindcss/colors';

type Props = {
  title: string;
};

export function HeaderForm({ title, ...rest }: Props) {
  const navigation = useNavigation();

  return (
    <View
      className={`h-[110px] w-full bg-roxoP items-center justify-center flex-row p-6 pt-[${getStatusBarHeight() + 24
        }] mb-6`}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} className="z-50">
        <MaterialIcons name="chevron-left" size={32} color={colors.zinc[100]} />
      </TouchableOpacity>

      <Text className="text-xl font-bold flex-1 text-center -ml-8 text-zinc-100">
        {title}
      </Text>
    </View>
  );
}
