import {
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';


import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

import { Home } from './src/screens/home';
import theme from './src/styles/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Archivo_400Regular,
          Archivo_500Medium,
          Archivo_600SemiBold
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

