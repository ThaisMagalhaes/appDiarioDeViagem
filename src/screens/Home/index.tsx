import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, SafeAreaView } from 'react-native';
import Animated, { Layout } from 'react-native-reanimated';
import { FloatingButton, HomeHeader, Card, useHomeHeaderStyles } from '@components';
const list = [
  {
    id: 1,
    local: 'Viagem ao centro da terra',
    data: new Date('2023-11-13T00:37:11.556Z'),
    finalizado: true,
    exibirAno: true,
  },
  { id: 2, local: 'Viagem ao novo mundo', data: new Date('2023-11-12T00:37:11.556Z'), finalizado: false },
  { id: 3, local: 'Viagem ao ceu', data: new Date('2023-10-10T00:37:11.556Z'), finalizado: false },
  { id: 4, local: 'Viagem a marte', data: new Date('2023-09-25T00:37:11.556Z'), finalizado: false },
  { id: 5, local: 'Viagem a marte', data: new Date('2023-09-25T00:37:11.556Z'), finalizado: false },
  { id: 6, local: 'Viagem a marte', data: new Date('2023-09-25T00:37:11.556Z'), finalizado: false },
  { id: 7, local: 'Viagem a marte', data: new Date('2023-09-25T00:37:11.556Z'), finalizado: false },
];

export const TEMPO_MILISEGUNDOS_ESPERA_ANIMACAO_FLAT_LIST = 120;

export function Home() {
  const navigation = useNavigation();
  const [viagens, setViagens] = useState(list);
  const [viagensSelecionadas, setViagensSelecionadas] = useState<Map<number, boolean>>(new Map<number, boolean>());
  const [abrirInputPesquisa, setAbrirInputPesquisa] = useState(false);

  const { scrollY, headerImageStyles, headerStyles, iconStyle, scrollHandler, voltarIconStyle } = useHomeHeaderStyles();

  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const existeItensSelecionados = viagensSelecionadas.size > 0;

  function handleFecharInputPesquisa() {
    setAbrirInputPesquisa(false);
  }

  function handleAbrirInputPesquisa() {
    setAbrirInputPesquisa(true);
  }

  function handleSelecionarViagem(viagem) {
    const itens = new Map<number, boolean>(viagensSelecionadas);

    viagensSelecionadas.has(viagem.id) ? itens.delete(viagem.id) : itens.set(viagem.id, !itens.get(viagem.id));
    setViagensSelecionadas(itens);

    if (itens && abrirInputPesquisa) {
      handleFecharInputPesquisa();
    }
  }

  function handleRemoverTodasViagensSelecionadas() {
    // exibir alerta de confirmação de exclusão
    // autenticação local
    // remover viagens selecionadas

    const itens = Array.from(viagensSelecionadas, ([id]) => id);
    const novaListaViagens = viagens.filter((item) => !itens.includes(item.id));

    setViagensSelecionadas(new Map());
    setViagens(novaListaViagens);
  }

  function handlePesquisarViagens(texto: string) {
    Keyboard.dismiss();

    // retornar todas as viagens se o texto for vazio
    // consultar viagens pelo nome se existir valor no parâmetro texto
    if (!texto) {
      setViagens(list);
      return;
    }
    const lista = list.filter((item) => item.local.match(texto));
    setViagens(lista);
  }

  const renderListItem = ({ item, index }) => {
    return (
      <Card
        key={item.id}
        posicao={index}
        initialMode={initialMode.current}
        exibirAnoViagem={item.exibirAno}
        viagem={item}
        selecionado={!!viagensSelecionadas.get(item.id)}
        habilitarSelecao={existeItensSelecionados}
        onSelecionarViagem={handleSelecionarViagem}
        onClique={() => navigation.navigate('ConsultarViagemForm')}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-azul-900">
      <HomeHeader.Root headerStyles={headerStyles} imageStyles={headerImageStyles}>
        {existeItensSelecionados && (
          <HomeHeader.DeleteContent
            iconStyle={iconStyle}
            voltarIconStyle={voltarIconStyle}
            onRemover={handleRemoverTodasViagensSelecionadas}
            onVoltar={() => setViagensSelecionadas(new Map<number, boolean>())}
          />
        )}
        {!existeItensSelecionados && (
          <HomeHeader.SearchInput
            voltarIconStyle={voltarIconStyle}
            exibirPesquisa={abrirInputPesquisa}
            iconStyle={iconStyle}
            scrollY={scrollY}
            onFecharInput={handleFecharInputPesquisa}
            onAbrirInput={handleAbrirInputPesquisa}
            onPesquisar={handlePesquisarViagens}
          />
        )}
      </HomeHeader.Root>
      <Animated.FlatList
        className="w-full"
        contentContainerStyle={{ paddingHorizontal: 16 }}
        removeClippedSubviews={false}
        itemLayoutAnimation={Layout.delay(TEMPO_MILISEGUNDOS_ESPERA_ANIMACAO_FLAT_LIST)}
        data={viagens}
        extraData={viagensSelecionadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderListItem}
        scrollEventThrottle={1}
        onScroll={scrollHandler}
      />
      <FloatingButton onPress={() => navigation.navigate('CadastrarViagemForm', {})} />
    </SafeAreaView>
  );
}
