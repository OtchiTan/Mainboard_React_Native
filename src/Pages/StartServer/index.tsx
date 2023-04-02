import {useContext, useEffect, useState} from 'react';
import {Button, NativeModules, Text, View} from 'react-native';
import Application from '../../Models/Application';
import AppContext from '../../AppContext';
import Dashboard from '../Dashboard';

export default ({navigation}: any): JSX.Element => {
  const [tryWake, setTryWake] = useState<number>(0);
  const [isWakeCalled, setIsWakeCalled] = useState<boolean>(false);
  let {setApps} = useContext(AppContext);

  const startServer = () => {
    if (!isWakeCalled) {
      setIsWakeCalled(true);
      const {WakeOnLanModule} = NativeModules;
      WakeOnLanModule.wake(
        'D8:97:BA:81:6A:9B',
        '88.138.52.95',
        9,
        (error: string) => console.log(error),
      );
    }
  };

  useEffect(() => {
    if (isWakeCalled) {
      const {HttpRequestModule} = NativeModules;
      HttpRequestModule.get(
        'http://otchi.ovh:3000/',
        (result: string) => {
          if (typeof setApps !== 'undefined') {
            const applications = JSON.parse(result)
              .applications as Application[];
            setApps(applications);
            navigation.navigate('Dashboard');
          }
        },
        () => setTimeout(() => setTryWake(tryWake + 1), 1000),
      );
    }
  }, [isWakeCalled, tryWake]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title={'Start Server'} onPress={startServer} />
    </View>
  );
};
