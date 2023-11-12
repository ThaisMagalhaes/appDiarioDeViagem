import { useMemo, useState, useEffect, useCallback, type ReactNode } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { SplashVideo } from './Video';
import * as SplashScreen from 'expo-splash-screen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Font from 'expo-font';

type AnimatedSplashScreenProps = {
  children: ReactNode;
};

export function AnimatedSplashScreen({ children }: AnimatedSplashScreenProps) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashVideoComplete, setSplashVideoComplete] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady && isSplashVideoComplete) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setAnimationComplete(true);
      });
    }
  }, [isAppReady, isSplashVideoComplete]);

  const onVideoLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      await Font.loadAsync(MaterialIcons.font);
    } catch (error) {
      console.warn('error when finishing splash', error);
    } finally {
      setAppReady(true);
    }
  }, []);

  const videoElement = useMemo(() => {
    return (
      <SplashVideo
        onLoaded={onVideoLoaded}
        onFinish={() => {
          setSplashVideoComplete(true);
        }}
      />
    );
  }, [onVideoLoaded, setSplashVideoComplete]);

  return (
    <View className="flex-1">
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: animation,
            },
          ]}>
          {videoElement}
        </Animated.View>
      )}
    </View>
  );
}
