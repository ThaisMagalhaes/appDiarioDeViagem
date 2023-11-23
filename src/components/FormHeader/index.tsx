import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { MIN_HEADER_HEIGHT } from 'utils/contants';
import { theme } from 'utils/theme';

type FormHeaderProps = {
  title: string;
  onSalvar?: () => void;
  ocultarBotaoSalvar?: boolean;
  paginaDeAlteracao?: keyof ReactNavigation.RootParamList;
};

export function FormHeader({
  title,
  ocultarBotaoSalvar,
  onSalvar,
  paginaDeAlteracao = 'AlterarViagemForm',
}: FormHeaderProps) {
  const navigation = useNavigation();

  return (
    <View
      className="relative z-[99] mt-0 w-full bg-azul-900"
      style={{
        height: MIN_HEADER_HEIGHT,
        shadowColor: '#31384C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2.65,
        elevation: 10,
      }}>
      <GestureHandlerRootView
        className="h-full max-h-14 w-full flex-row items-center justify-between px-3"
        style={{ marginTop: Constants.statusBarHeight }}>
        <TouchableNativeFeedback
          onPress={() => navigation.goBack()}
          background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], true)}
          className="my-auto h-8 w-8 items-center justify-center rounded">
          <MaterialIcon name="arrow-back" size={24} color={theme.colors.azul[600]} />
        </TouchableNativeFeedback>
        <Text
          className={`text-center text-lg font-semibold text-azul-200 ${!ocultarBotaoSalvar ? '' : 'z-[-1] flex-1'}`}>
          {title}
        </Text>
        {!ocultarBotaoSalvar && (
          <View className="z-[-1] -ml-8 h-full  flex-row items-center">
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], false)}
              onPress={onSalvar}>
              <Text className="rounded bg-azul-700 px-2 py-[3px] text-base text-azul-100">SALVAR</Text>
            </TouchableNativeFeedback>
          </View>
        )}
        {ocultarBotaoSalvar && (
          <TouchableNativeFeedback
            onPress={() => navigation.navigate(paginaDeAlteracao)}
            background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], true)}
            className="my-auto h-8 w-8 items-center justify-center rounded">
            <MaterialIcon name="edit" size={24} color={theme.colors.azul[600]} />
          </TouchableNativeFeedback>
        )}
      </GestureHandlerRootView>
    </View>
  );
}
