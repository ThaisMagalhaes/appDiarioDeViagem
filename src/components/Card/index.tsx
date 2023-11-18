import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, { SlideOutLeft, ZoomIn } from 'react-native-reanimated';
import { theme } from '../../utils/theme';

type Viagem = {
  id: number;
  local: string;
  data: Date;
  finalizado: boolean;
};

type Props = {
  posicao: number;
  initialMode?: boolean;
  exibirAnoViagem?: boolean;
  viagem: Viagem;
  selecionado?: boolean;
  habilitarSelecao?: boolean;
  onSelecionarViagem?: (viagem: Viagem) => void;
};

export const TEMPO_ESPERA_ANIMACAO_EM_MILISEGUNDOS = 100;

export function Card({
  posicao,
  initialMode,
  selecionado,
  habilitarSelecao,
  viagem,
  onSelecionarViagem,
  exibirAnoViagem = false,
}: Props) {
  function handleSelecionarItem() {
    if (!habilitarSelecao) {
      onSelecionarViagem && onSelecionarViagem(viagem);
    }
  }

  function handleClique() {
    if (habilitarSelecao) {
      onSelecionarViagem && onSelecionarViagem(viagem);
    }
  }

  return (
    <Animated.View
      className="mb-3"
      entering={initialMode ? ZoomIn.delay(TEMPO_ESPERA_ANIMACAO_EM_MILISEGUNDOS * posicao) : ZoomIn}
      exiting={SlideOutLeft}>
      <GestureHandlerRootView>
        {exibirAnoViagem && (
          <View className="mb-3">
            <Text className="text-sm  text-azul-600">
              {Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(viagem.data)}
            </Text>
          </View>
        )}
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(theme.colors.azul[500], false)}
          onLongPress={handleSelecionarItem}
          onPress={handleClique}
          className={`w-full flex-row items-center rounded-lg border ${
            selecionado ? 'border-azul-700 bg-azul-700' : 'border-azul-800 bg-azul-800'
          }  p-3 shadow-md`}>
          <View className="flex-1">
            <View className="flex-row items-baseline gap-1">
              <View className="relative">
                <Text className="text-2xl font-bold text-azul-50">
                  {Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(viagem.data)}
                </Text>
                <View className="absolute bottom-[3px] left-0 z-[-1] h-[6px] w-full bg-azul-600 content-['']" />
              </View>
              <Text className="mr-2 text-sm text-slate-400">
                {Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(viagem.data)}
              </Text>
              {!viagem.finalizado && (
                <View className="flex-row">
                  <MaterialCommunityIcons name="notebook-edit" size={16} color={theme.colors.slate[400]} />
                  <Text className="ml-1 text-slate-400">Rascunho</Text>
                </View>
              )}
            </View>
            <View className="mt-2">
              <Text className="mb-2 text-base font-bold text-azul-50" ellipsizeMode="tail" numberOfLines={1}>
                {viagem.local}
              </Text>

              <Text ellipsizeMode="tail" numberOfLines={3} className="leading-4 text-azul-100">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab quis illum consectetur incidunt minus dolor
                consequatur odit quaerat eaque, sequi laudantium repellendus ea ipsum voluptatem quia repellat
                architecto perspiciatis optio modi porro quae quam sint quibusdam facere! Ratione velit laborum
                dignissimos officia sunt.
              </Text>
            </View>
            {viagem.id === 1 && (
              <View className="mt-2 flex-1 flex-row items-center space-x-2">
                <Image
                  source={require('../../../assets/images/1.jpg')}
                  resizeMode="cover"
                  className="h-[78px] w-[78px] rounded"
                />
                <Image
                  source={require('../../../assets/images/1.jpg')}
                  resizeMode="cover"
                  className="h-[78px] w-[78px] rounded"
                />
                <Image
                  source={require('../../../assets/images/1.jpg')}
                  resizeMode="cover"
                  className="h-[78px] w-[78px] rounded"
                />
                <View className="relative items-center justify-center">
                  <Image
                    source={require('../../../assets/images/1.jpg')}
                    resizeMode="cover"
                    className="h-[78px] w-[78px] rounded"
                  />

                  <Text className="absolute text-xl text-azul-50">+6</Text>
                </View>
              </View>
            )}
          </View>
        </TouchableNativeFeedback>
      </GestureHandlerRootView>
    </Animated.View>
  );
}
