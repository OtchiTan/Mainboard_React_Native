import {useEffect, useState} from 'react';
import {View, BackHandler} from 'react-native';
import {Application} from '../../Models/Application';
import Apps from './Apps';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RoutesList} from '../../Utils/Declarations';

type RouteParam = {app: {app: Application}};

export default ({
  navigation,
  route,
}: {
  navigation: NavigationProp<RoutesList>;
  route: RouteProp<RouteParam>;
}): JSX.Element => {
  const [app] = useState<Application>(route.params.app);
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
