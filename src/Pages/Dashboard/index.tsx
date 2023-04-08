import React, {useContext, useEffect} from 'react';
import {FlatList} from 'react-native';
import AppContext from '../../AppContext';
import Application from '../../Models/Application';
import AppLayout from './Components/AppLayout';
import HttpClient, {HttpErrorCause} from '../../Utils/HttpClient';

type ResponseAPI = {
  applications: Application[];
};

export default ({navigation}: any): JSX.Element => {
  const {apps, setApps, onNeedLogin, authToken} = useContext(AppContext);
  useEffect(() => {
    if (apps.length === 0) {
      const httpClient = new HttpClient<ResponseAPI>();
      httpClient
        .get('')
        .then(({applications}) => {
          setApps(applications);
          navigation.navigate('Dashboard');
        })
        .catch(error => {
          if ((error as HttpErrorCause) === 'UNAUTHORIZED')
            onNeedLogin(navigation);
          else {
            console.log('ERROR');
          }
        });
    }
  }, []);

  const onItemPress = (app: Application) => {
    if (app.isContainer) navigation.navigate('ContainerApplication', {app});
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
