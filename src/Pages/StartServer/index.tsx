import {Button, NativeModules} from 'react-native';

export default (): JSX.Element => {
  const startServer = () => {
    const {WakeOnLanModule} = NativeModules;
    WakeOnLanModule.wake(
      'D8:97:BA:81:6A:9B',
      '88.138.52.95',
      9,
      (error: string) => {
        console.log(error);
      },
    );
  };

  return <Button title="StartServer" onPress={startServer} />;
};
