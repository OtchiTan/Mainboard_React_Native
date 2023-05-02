import React, {useContext, useEffect} from 'react';
import {BackHandler, FlatList} from 'react-native';
import AppContext from '../../AppContext';
import {Application} from '../../Models/Application';
import AppLayout from './Components/AppLayout';
import {AxiosClient} from '../../Utils/AxiosClient';
import {Socket, io} from 'socket.io-client';

type ResponseAPI = {
  applications: Application[];
};

export default ({navigation}: any): JSX.Element => {
  const {apps, setApps, onNeedLogin} = useContext(AppContext);

  useEffect(() => {
    const backHandler = () => true;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    const socket = io('https://api.otchi.ovh/applications', {secure: true});

    if (apps.length === 0) {
      new AxiosClient()
        .get<ResponseAPI>('')
        .then(({data}) => setApps(data.applications))
        .catch(error => {
          if (error.response.status === 401) onNeedLogin(navigation);
          else console.log('ERROR');
        });
    }

    socket.on('applications_update', data => {
      setApps(data.applications);
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
      socket.off('applications_update');
      socket.disconnect();
    };
  }, []);

  const onItemPress = (app: Application) => {
    if (app.containerArgs) navigation.navigate('ContainerApplication', {app});
    else navigation.navigate('CustomApplication', {app});
  };

  return (
    <FlatList
      data={apps}
      renderItem={({item}) => <AppLayout item={item} onPress={onItemPress} />}
      keyExtractor={app => app.name}
      numColumns={2}
      style={{flex: 1}}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    />
  );
};
