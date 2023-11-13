import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import Constants from 'expo-constants';
import { theme } from 'utils/theme';

/** Opacidade da imagem quando o header estiver expandido */
const IMAGE_OPACITY = 0.9;

/** Altura padrão do header */
const HEADER_HEIGHT = 56;

/** Altura do cabeçalho quando estiver expadido */
const EXPANDED_HEADER_HEIGHT = 160;

/** Valor da margem inferior quando o header estiver expandido */
const BOTTOM_MARGIN_VALUE_WHEN_HEADER_IS_EXPANDED = 16;

/** A altura minima do header é composta pela altura padrão do header + altura da barra de status do dispositivo */
export const MIN_HEADER_HEIGHT = HEADER_HEIGHT + Constants.statusBarHeight;

/** A altura máxima do header é composta pela altura do header expandido + altura da barra de status do dispositivo */
export const MAX_HEADER_HEIGHT = EXPANDED_HEADER_HEIGHT + Constants.statusBarHeight;

export function useHomeHeaderStyles() {
  const scrollY = useSharedValue(0);
  const searchAnimation = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const iconStyle = useAnimatedStyle(() => {
    const searchInputAnimation = Number(searchAnimation.value);

    const indexCorAzulEscuro = 800;
    const indexCorAzulClaro = 50;

    const color = interpolateColor(
      scrollY.value,
      [0, MAX_HEADER_HEIGHT],
      [
        theme.colors.azul[interpolate(searchInputAnimation, [0, 1], [indexCorAzulClaro, indexCorAzulEscuro])],
        theme.colors.azul[600],
      ]
    );

    return {
      color,
    };
  });

  const voltarIconStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollY.value,
      [0, MAX_HEADER_HEIGHT],
      [theme.colors.azul[50], theme.colors.azul[600]]
    );

    return {
      color,
    };
  });

  const headerStyles = useAnimatedStyle(() => {
    let boxShadowStyle = {};

    if (scrollY.value > MIN_HEADER_HEIGHT) {
      boxShadowStyle = {
        shadowColor: '#E3DDEE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 14,
      };
    } else {
      boxShadowStyle = {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      };
    }
    return {
      height: interpolate(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
        Extrapolation.CLAMP
      ),
      marginBottom: interpolate(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [BOTTOM_MARGIN_VALUE_WHEN_HEADER_IS_EXPANDED, 0],
        Extrapolation.CLAMP
      ),
      ...boxShadowStyle,
    };
  });

  const headerImageStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, MAX_HEADER_HEIGHT],
        [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
        Extrapolation.CLAMP
      ),
      opacity: interpolate(scrollY.value, [0, MAX_HEADER_HEIGHT], [IMAGE_OPACITY, 0], Extrapolation.CLAMP),
    };
  });

  return {
    scrollY,
    searchAnimation,
    voltarIconStyle,
    iconStyle,
    headerStyles,
    headerImageStyles,
    scrollHandler,
  };
}
