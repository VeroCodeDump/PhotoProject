/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import PhotoDisplay from './components/PhotoDisplay';





function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';



  return (

    <View style={{ flex: 1 }}>
      <PhotoDisplay ></PhotoDisplay>
    </View>
  );
}



export default App;
