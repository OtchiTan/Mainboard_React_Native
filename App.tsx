/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NativeModules} from 'react-native';
import Application from './src/Models/Application';
import Dashboard from './src/Pages/Dashboard';
import StartServer from './src/Pages/StartServer';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    container: {
      flex: 1,
    },
  };

  const [page, setPage] = useState<JSX.Element>();

  useEffect(() => {
    const {HttpRequestModule} = NativeModules;
    HttpRequestModule.get(
      'http://otchi.ovh:3000/',
      (result: string) => {
        const applications = JSON.parse(result).applications as Application[];
        setPage(<Dashboard apps={applications} />);
      },
      () => {
        setPage(<StartServer />);
      },
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {page ? page : <Text>Vérification de l'état du serveur</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
