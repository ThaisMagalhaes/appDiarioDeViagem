import { type AVPlaybackStatus, Video, ResizeMode } from 'expo-av';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

export function SplashVideo({ onLoaded, onFinish }) {
  const videoRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

  function handlePlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      if (lastStatus.isLoaded !== status.isLoaded) {
        onLoaded();
      }

      if (status.didJustFinish) {
        onFinish();
      }
    }
    setStatus(() => status);
  }

  return (
    <Video
      ref={videoRef}
      style={StyleSheet.absoluteFill}
      source={require('../../../assets/splash.mp4')}
      shouldPlay={!(lastStatus.isLoaded && lastStatus.didJustFinish)}
      isLooping={false}
      resizeMode={ResizeMode.COVER}
      onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
    />
  );
}
