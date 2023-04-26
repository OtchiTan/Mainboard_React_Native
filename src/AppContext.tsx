import {createContext, useContext, useEffect} from 'react';
import {View} from 'react-native';
import {Application} from './Models/Application';
import CheckServer from './Pages/CheckServer';

type RouterContextType = {
  apps: Application[];
  setApps: (apps: Application[]) => void;
  onNeedLogin: (navigation: any) => void;
  authToken: string;
  setAuthToken: (newToken: string) => void;
  navigator: any;
  setNavigator: (newNavigator: any) => void;
};

export default createContext<RouterContextType>({
  apps: [],
  setApps(apps) {},
  onNeedLogin(navigation) {},
  authToken: '',
  setAuthToken(newToken) {},
  navigator: null,
  setNavigator(newNavigator) {
    this.navigator = newNavigator;
  },
});
