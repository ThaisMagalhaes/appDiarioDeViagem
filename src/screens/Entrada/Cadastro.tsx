import { Carrossel, DatePicker, FormHeader, Input } from 'components';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, Text } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';
import Toast from 'react-native-root-toast';
import { DIARIO_VIAGEM_DIR_COMPLETO } from 'utils/contants';
import { theme } from 'utils/theme';
import { makeGerenciadorArquivoService } from 'core';

const gerenciadorArquivoService = makeGerenciadorArquivoService();

export function CadastrarEntrada({ route }) {
  const { params } = route;
  const { apenasConsulta, title } = params;

  const [imagens, setImagens] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [imagemSelecionada, setImagemSelecionada] = useState({ visible: false, index: 0 });
  const imagensUrls = useMemo(() => imagens.map((item) => item.uri), [imagens]);

  useEffect(() => {
    const pedirPermissaoLeituraArquivos = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          Toast.show('Desculpe, precisamos dessas permissões!', {
            duration: Toast.durations.LONG,
            position: -50,
          });
        }
      }
    };

    void pedirPermissaoLeituraArquivos();
  }, []);

  useEffect(() => {
    async function carregarImagens() {
      // Carregar as imagens que estiverem cadastradas no banco
      // Usar o Id da entrada quando houver para criar o diretorio, Ex. diarioviagem/01/...
      // Isso facilitará as consultas sem precisar filtrar pelo nome do arquivo

      await gerenciadorArquivoService.criarDiretorioSeNaoExiste(DIARIO_VIAGEM_DIR_COMPLETO);

      const caminhoImagens =
        await gerenciadorArquivoService.obterCaminhoTodosArquivosDiretorio(DIARIO_VIAGEM_DIR_COMPLETO);

      const imagensUri = caminhoImagens.map((caminho) => ({ uri: caminho }));

      setImagens(imagensUri as ImagePicker.ImagePickerAsset[]);
    }

    void carregarImagens();
  }, []);

  const handleSelecionarImagens = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      base64: false,
    });

    if (!result.canceled) {
      const ids = imagens.map((item) => item.assetId);
      const novasImagens = result.assets.filter((item) => !ids.includes(item.assetId) || item.assetId === null);

      setImagens([...novasImagens, ...imagens]);
      return;
    }

    Toast.show('Você não selecionou nenhuma imagem', {
      duration: Toast.durations.SHORT,
      position: -50,
    });
  }, [imagens]);

  const handleFecharVisualizacaoImagem = useCallback(() => setImagemSelecionada({ visible: false, index: 0 }), []);

  const handleAbrirVisualizacaoImagem = useCallback(
    (imagemUrl: string) =>
      setImagemSelecionada({ visible: true, index: imagensUrls.findIndex((item) => item === imagemUrl) }),
    [imagensUrls]
  );

  const handleRemoverImagem = useCallback((imagemUrl: string) => {
    setImagens((state) => state.filter((item) => item.uri !== imagemUrl));
  }, []);

  const handleSalvarEntrada = useCallback(async () => {
    // salvar os dados da entrada
    // salvar as imagens localmente se não existir
    // remover fotos do diretorio que foram excluidas

    try {
      const caminhoArquivos = imagensUrls;

      // Usar o Id da entrada quando houver para criar o diretorio, Ex. diarioviagem/01/...
      // Isso facilitará as consultas sem precisar filtrar pelo nome do arquivo
      const diretorioSalvarImagens = DIARIO_VIAGEM_DIR_COMPLETO;
      await gerenciadorArquivoService.copiarArquivosParaDiretorio(caminhoArquivos, diretorioSalvarImagens);
    } catch (erro) {
      console.log(`ERROR: ${erro}`);

      return false;
    }
  }, [imagensUrls]);

  return (
    <SafeAreaView className="flex-1 bg-azul-900">
      <FormHeader
        title={title}
        onSalvar={handleSalvarEntrada}
        retornarParaPagina={apenasConsulta ? 'ConsultarViagemForm' : 'AlterarViagemForm'}
        paginaDeAlteracao="AlterarEntrada"
        ocultarBotaoSalvar={apenasConsulta}
      />

      <ScrollView nestedScrollEnabled={true} scrollEventThrottle={16} className="mt-4 px-4">
        <DatePicker onChange={console.log} habilitarAlteracao={!apenasConsulta} />
        <Input label="Local" placeholder="Informe o local da viagem" editable={!apenasConsulta} />
        <Input
          multiline
          textAlignVertical="top"
          label="Descrição"
          placeholder="Informe uma descrição"
          className="h-auto min-h-[220]"
          editable={!apenasConsulta}
        />
        <GestureHandlerRootView className="mb-3 flex-row items-center justify-between">
          <Text className="mb-2 text-base text-azul-600">Fotos</Text>

          {!apenasConsulta && (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(theme.colors.azul[200], false)}
              onPress={handleSelecionarImagens}
              className="rounded border border-azul-700">
              <Text className="rounded px-2 py-[3px] text-base text-azul-100">ADICIONAR</Text>
            </TouchableNativeFeedback>
          )}
        </GestureHandlerRootView>
        {imagensUrls.length > 0 ? (
          <Carrossel
            imagens={imagensUrls}
            onRemoverImagem={handleRemoverImagem}
            onImagemClique={handleAbrirVisualizacaoImagem}
            ocultarBotaoRemover={apenasConsulta}
          />
        ) : (
          <Text className="text-center text-base text-azul-700">
            Faça o seu diário único! Adicione fotos que capturam a essência dos seus momentos.
          </Text>
        )}
      </ScrollView>
      <ImageView
        images={imagens}
        imageIndex={imagemSelecionada.index}
        visible={imagemSelecionada.visible}
        backgroundColor={theme.colors.azul[900]}
        animationType="fade"
        presentationStyle="fullScreen"
        onRequestClose={handleFecharVisualizacaoImagem}
      />
    </SafeAreaView>
  );
}
