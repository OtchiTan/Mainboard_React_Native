/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Application from './src/Models/Application';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppContext from './src/AppContext';
import ApplicationPage from './src/Pages/Application';
import Dashboard from './src/Pages/Dashboard';
import CheckServer from './src/Pages/CheckServer';
import Login from './src/Pages/Login';
import StartServer from './src/Pages/StartServer';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [apps, setApps] = useState<Application[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AppContext.Provider value={{apps, setApps}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CheckServer"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CheckServer" component={CheckServer} />
          <Stack.Screen name="StartServer" component={StartServer} />
          <Stack.Screen name="Application" component={ApplicationPage} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
