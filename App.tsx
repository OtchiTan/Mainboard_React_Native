/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Application} from './src/Models/Application';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AppContext from './src/AppContext';
import Dashboard from './src/Pages/Dashboard';
import CheckServer from './src/Pages/CheckServer';
import Login from './src/Pages/Login';
import StartServer from './src/Pages/StartServer';
import ContainerApplication from './src/Pages/ContainerApplication';
import CustomApplication from './src/Pages/CustomApplication';
import {setToken} from './src/Utils/AuthStorage';
import {Button, Modal, Text} from 'react-native';
import StopModal from './src/Pages/Dashboard/Components/StopModal';
import Register from './src/Pages/Register';
import {io} from 'socket.io-client';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [apps, setApps] = useState<Application[]>([]);
  const [authToken, setAuthToken] = useState<string>('');
  const [stopModalVisibility, setStopModalVisibility] =
    useState<boolean>(false);

  const setNewAuthToken = async (newToken: string) => {
    await setToken(newToken);
    setAuthToken(newToken);
  };

  const dashboardHeaderOptions: NativeStackNavigationOptions = {
    headerShown: true,
    headerBackVisible: false,
    headerRight: () => (
      <Button title="Stop" onPress={() => setStopModalVisibility(true)} />
    ),
    title: 'Mainboard',
  };

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          apps,
          setApps,
          onNeedLogin(navigation: any) {
            navigation.navigate('Login');
          },
          authToken,
          setAuthToken: setNewAuthToken,
          navigator: null,
          setNavigator(newNavigator) {
            this.navigator = newNavigator;
          },
        }}>
        <Modal
          visible={stopModalVisibility}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setStopModalVisibility(false)}
          children={<StopModal />}
        />
        <Stack.Navigator
          initialRouteName="CheckServer"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={dashboardHeaderOptions}
          />
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
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}

export default App;
