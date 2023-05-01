import {useContext, useEffect} from 'react';
import {Text, View, BackHandler} from 'react-native';
import {Application} from '../../Models/Application';
import AppContext from '../../AppContext';
import {AxiosClient} from '../../Utils/AxiosClient';

type ResponseAPI = {
  applications: Application[];
};

export default ({navigation}: any): JSX.Element => {
  let {setApps, onNeedLogin, setNavigator} = useContext(AppContext);

  useEffect(() => {
    setNavigator(navigation);

    new AxiosClient()
      .get<ResponseAPI>('')
      .then(({data}) => {
        setApps(data.applications);
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        if (error.response.status === 401) onNeedLogin(navigation);
        else navigation.navigate('StartServer');
      });
  }, []);

  useEffect(() => {
    const backHandler = () => true;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Vérification de l'état du serveur</Text>
    </View>
  );
};
