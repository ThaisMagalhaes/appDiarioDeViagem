import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from 'tailwindcss/colors';

type Props = {
  title: string;
};
const TOP_PADDING_HEADER = 24;

export function HeaderForm({ title, ...rest }: Props) {
  const navigation = useNavigation();

  return (
    <View
      className={`pt-[${
        getStatusBarHeight() + TOP_PADDING_HEADER
      }] mb-6 h-[110px] w-full flex-row items-center justify-center bg-roxoP p-6`}>
      <TouchableOpacity onPress={() => navigation.goBack()} className="z-50">
        <MaterialIcons name="chevron-left" size={32} color={colors.zinc[100]} />
      </TouchableOpacity>

      <Text className="-ml-8 flex-1 text-center text-xl font-bold text-zinc-100">{title}</Text>
    </View>
  );
}
