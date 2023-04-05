import {useContext, useEffect} from 'react';
import {Text, View, BackHandler} from 'react-native';
import Application from '../../Models/Application';
import AppContext from '../../AppContext';
import AxiosClient from '../../Utils/AxiosClient';
import {getAuthHeader} from '../../Utils/AuthStorage';

export default ({navigation}: any): JSX.Element => {
  let {setApps, onNeedLogin} = useContext(AppContext);

  useEffect(() => {
    const fetchApps = async () => {
      AxiosClient.get('', {headers: await getAuthHeader()})
        .then(res => {
          const applications = res.data.applications as Application[];
          setApps(applications);
          navigation.navigate('Dashboard');
        })
        .catch(err => {
          console.log(JSON.stringify(err, null, 2));

          if (err.response && err.response.status === 401)
            onNeedLogin(navigation);
          else navigation.navigate('StartServer');
        });
    };
    fetchApps();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Vérification de l'état du serveur</Text>
    </View>
  );
};
