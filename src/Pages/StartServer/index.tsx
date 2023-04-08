import {useContext, useEffect, useState} from 'react';
import {Button, NativeModules, Text, View, BackHandler} from 'react-native';
import Application from '../../Models/Application';
import AppContext from '../../AppContext';
import HttpClient, {HttpErrorCause} from '../../Utils/HttpClient';

type ResponseAPI = {
  applications: Application[];
};

export default ({navigation}: any): JSX.Element => {
  const [tryWake, setTryWake] = useState<number>(0);
  const [isWakeCalled, setIsWakeCalled] = useState<boolean>(false);
  let {setApps, onNeedLogin} = useContext(AppContext);

  const startServer = () => {
    setIsWakeCalled(true);
    const {WakeOnLanModule} = NativeModules;
    WakeOnLanModule.wake(
      'D8:97:BA:81:6A:9B',
      '88.138.52.95',
      9,
      (error: string) => console.log(error),
    );
  };

  useEffect(() => {
    if (isWakeCalled) {
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
            startServer();
            setTimeout(() => setTryWake(tryWake + 1), 1000);
          }
        });
    }
  }, [isWakeCalled, tryWake]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isWakeCalled ? (
        <Text>Server Is Starting</Text>
      ) : (
        <Button title={'Start Server'} onPress={startServer} />
      )}
    </View>
  );
};
