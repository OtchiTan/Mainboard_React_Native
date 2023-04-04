import {useContext, useEffect} from 'react';
import {NativeModules, Text, View} from 'react-native';
import Application from '../../Models/Application';
import AppContext from '../../AppContext';
import {HttpErrorCause} from '../../Utils/Declarations';

export default ({navigation}: any): JSX.Element => {
  let {setApps} = useContext(AppContext);

  useEffect(() => {
    const {HttpRequestModule} = NativeModules;
    HttpRequestModule.get(
      'http://otchi.ovh:3000/',
      (result: string) => {
        if (typeof setApps !== 'undefined') {
          const applications = JSON.parse(result).applications as Application[];
          setApps(applications);
          navigation.navigate('Dashboard');
        }
      },
      (error: HttpErrorCause) => {
        if (error === 'TIMEDOUT') navigation.navigate('StartServer');
        else if (error === 'UNAUTHORIZED') navigation.navigate('Login');
      },
    );
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Vérification de l'état du serveur</Text>
    </View>
  );
};
