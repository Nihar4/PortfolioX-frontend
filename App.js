import React, { useEffect } from 'react';
// import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import Main from './Main';
import * as Font from 'expo-font';

export default function App() {
  useEffect(() => {
    (async () => await Font.loadAsync({
      // Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),

    }))();
  }, [])



  return (
    <PaperProvider>
      <Main />
    </PaperProvider>
  );
}
