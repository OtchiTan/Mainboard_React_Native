import {createContext, useContext, useEffect} from 'react';
import {View} from 'react-native';
import Application from './Models/Application';
import CheckServer from './Pages/CheckServer';

type RouterContextType = {
  apps: Application[];
  setApps: (apps: Application[]) => void;
  onNeedLogin: (navigation: any) => void;
  authToken: string;
  setAuthToken: (newToken: string) => void;
};

export default createContext<RouterContextType>({
  apps: [],
  setApps(apps) {},
  onNeedLogin(navigation) {},
  authToken: '',
  setAuthToken(newToken) {},
});
