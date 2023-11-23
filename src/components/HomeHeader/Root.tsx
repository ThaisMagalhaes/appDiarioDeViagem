import Constants from 'expo-constants';
import { type ReactNode } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { MAX_HEADER_HEIGHT } from './useHeaderStyles';

type HeaderProps = {
  children?: ReactNode;
  headerStyles: any;
  imageStyles: any;
};

export function Root({ headerStyles, imageStyles, children }: HeaderProps) {
  return (
    <Animated.View style={headerStyles} className="relative z-[99] mt-0 w-full bg-azul-900">
      <Animated.Image
        style={imageStyles}
        className={`h-[${MAX_HEADER_HEIGHT}] w-full`}
        resizeMode="cover"
        source={require('../../../assets/images/mountain.png')}
      />
      <View
        className="absolute h-full max-h-14 w-full flex-row items-center justify-end px-4"
        style={{ marginTop: Constants.statusBarHeight }}>
        {children}
      </View>
    </Animated.View>
  );
}
