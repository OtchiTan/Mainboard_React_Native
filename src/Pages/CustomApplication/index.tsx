import {useEffect, useState} from 'react';
import {View, BackHandler} from 'react-native';
import {Application} from '../../Models/Application';
import Apps from './Apps';

export default ({navigation, route}: any) => {
  const params = route.params as {app: Application};
  const [app, setApp] = useState<Application>(params.app);
  const [page, setPage] = useState<JSX.Element>(<View></View>);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Dashboard');
      return true;
    });

    Object.entries(Apps).forEach(([key, value]) => {
      if (app.name === key) {
        setPage(value);
      }
    });
  }, []);

  return page;
};
