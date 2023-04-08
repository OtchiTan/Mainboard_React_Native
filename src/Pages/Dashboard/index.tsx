import React, {useContext, useEffect} from 'react';
import {FlatList} from 'react-native';
import AppContext from '../../AppContext';
import Application from '../../Models/Application';
import AxiosClient from '../../Utils/HttpClient';
import AppLayout from './Components/AppLayout';

export default ({navigation}: any): JSX.Element => {
  const {apps, setApps, onNeedLogin, authToken} = useContext(AppContext);

  if (apps.length === 0) {
    useEffect(() => {
      const fetchApps = async () => {
        // AxiosClient.get('', {headers: await getAuthHeader()})
        //   .then(res => {
        //     const applications = res.data.applications as Application[];
        //     setApps(applications);
        //     navigation.navigate('Dashboard');
        //   })
        //   .catch(err => {
        //     if (err.response.status === 401) onNeedLogin(navigation);
        //     else navigation.navigate('StartServer');
        //   });
      };
      fetchApps();
    }, []);
  }

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
