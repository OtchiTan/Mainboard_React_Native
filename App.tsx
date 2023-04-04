/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import Application from './src/Models/Application';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppContext from './src/AppContext';
import Dashboard from './src/Pages/Dashboard';
import CheckServer from './src/Pages/CheckServer';
import Login from './src/Pages/Login';
import StartServer from './src/Pages/StartServer';
import ContainerApplication from './src/Pages/ContainerApplication';
import CustomApplication from './src/Pages/CustomApplication';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [apps, setApps] = useState<Application[]>([]);

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
          <Stack.Screen
            name="ContainerApplication"
            component={ContainerApplication}
          />
          <Stack.Screen
            name="CustomApplication"
            component={CustomApplication}
          />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
