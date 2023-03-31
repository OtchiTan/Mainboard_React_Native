import {useEffect, useState} from 'react';
import {Button, NativeModules} from 'react-native';

export default (): JSX.Element => {
  const [tryWake, setTryWake] = useState<number>(0);
  const [isWakeCalled, setIsWakeCalled] = useState<boolean>(false);

  const startServer = () => {
    if (!isWakeCalled) {
      setIsWakeCalled(true);
      const {WakeOnLanModule} = NativeModules;
      WakeOnLanModule.wake(
        'D8:97:BA:81:6A:9B',
        '88.138.52.95',
        9,
        (error: string) => {
          console.log(error);
        },
      );
    }
  };

  useEffect(() => {
    if (isWakeCalled) {
      const {HttpRequestModule} = NativeModules;
      HttpRequestModule.get(
        'http://otchi.ovh:3000/',
        (result: string) => {
          // const applications = JSON.parse(result).applications as Application[];
          // setPage(<Dashboard apps={applications} />);
        },
        () => setTryWake(tryWake + 1),
      );
    }
  }, [isWakeCalled, tryWake]);

  return (
    <Button title={'StartServer : Try = ' + tryWake} onPress={startServer} />
  );
};
