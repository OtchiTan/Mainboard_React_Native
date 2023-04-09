import {useContext, useEffect} from 'react';
import {Text, View, BackHandler} from 'react-native';
import Application from '../../Models/Application';
import AppContext from '../../AppContext';
import {HttpErrorCause} from '../../Utils/HttpClient';
import HttpClient from '../../Utils/HttpClient';

type ResponseAPI = {
  applications: Application[];
};

export default ({navigation}: any): JSX.Element => {
  let {setApps, onNeedLogin, setNavigator} = useContext(AppContext);

  useEffect(() => {
    setNavigator(navigation);
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
        else navigation.navigate('StartServer');
      });
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
