import { Card } from 'components';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import { theme } from 'utils/theme';
import { DatePicker } from '../../components/DatePickerApp';
import { FormHeader } from '../../components/FormHeader';
import { Input } from '../../components/Input';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: 1,
    local: 'Pitangueiras',
    data: new Date('2022-01-01'),
    descricao:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aut commodi optio. Nostrum, numquam magni.',
  },
  {
    id: 2,
    local: 'Pitangueiras',
    data: new Date('2022-01-01'),
    descricao:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aut commodi optio. Nostrum, numquam magni.',
  },
  {
    id: 3,
    local: 'Pitangueiras',
    data: new Date('2022-01-01'),
    descricao:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aut commodi optio. Nostrum, numquam magni.',
  },
  {
    id: 4,
    local: 'Pitangueiras',
    data: new Date('2022-01-01'),
    descricao:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione aut commodi optio. Nostrum, numquam magni.',
  },
];

export function Form({ route }) {
  const navigation = useNavigation();
  const { params } = route;
  const { apenasConsulta, title } = params;

  const [local, setLocal] = useState('');

  const handleDateChange = (date: Date) => {
    // A função de retorno de chamada para atualizar o valor do campo de data
  };

  function handleSalvarViagem() {
    console.log('salvar');
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="h-full bg-azul-900">
      <FormHeader title={title} onSalvar={handleSalvarViagem} ocultarBotaoSalvar={apenasConsulta} />
      <ScrollView className="mt-3 bg-azul-900 px-4">
        <DatePicker onChange={handleDateChange} habilitarAlteracao={!apenasConsulta} />
        <Input
          label="Local"
          onChangeText={setLocal}
          editable={!apenasConsulta}
          value={local}
          placeholder="Informe o local da viagem"
        />

        <GestureHandlerRootView className="mb-3 flex-row items-center justify-between">
          <Text className="mb-2 text-base text-azul-600">Lembranças</Text>
          {!apenasConsulta && (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], false)}
              onPress={() => navigation.navigate('CadastrarEntrada', {})}
              className="rounded border border-azul-700">
              <Text className="rounded px-2 py-[3px] text-base text-azul-100">CADASTRAR</Text>
            </TouchableNativeFeedback>
          )}
        </GestureHandlerRootView>

        {data.map((item, index) => {
          return (
            <Card
              key={item.id}
              posicao={index}
              viagem={item}
              onClique={() => navigation.navigate(apenasConsulta ? 'ConsultarEntrada' : 'CadastrarEntrada', {})}
              exibirAnoViagem={false}
              habilitarSelecao={false}
              initialMode={true}
              desabilitarAnimacaoEntrada
            />
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
