import {useContext, useEffect, useState} from 'react';
import {Button, NativeModules, Text, View, BackHandler} from 'react-native';
import {Application} from '../../Models/Application';
import AppContext from '../../AppContext';
import {AxiosClient} from '../../Utils/AxiosClient';

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
      new AxiosClient()
        .get<ResponseAPI>('')
        .then(({data}) => {
          setApps(data.applications);
          navigation.navigate('Dashboard');
        })
        .catch(error => {
          if (error.response.status === 401) onNeedLogin(navigation);
          else {
            startServer();
            setTimeout(() => setTryWake(tryWake + 1), 1000);
          }
        });
    }
  }, [isWakeCalled, tryWake]);

  useEffect(() => {
    const backHandler = () => true;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
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
