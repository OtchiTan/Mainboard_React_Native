import {useContext, useEffect} from 'react';
import {NativeModules, Text, View} from 'react-native';
import Application from '../../Models/Application';
import {RouterContext} from '../../Router';
import Dashboard from '../Dashboard';
import StartServer from '../StartServer';

export default (): JSX.Element => {
  let {setPage} = useContext(RouterContext);

  useEffect(() => {
    const {HttpRequestModule} = NativeModules;
    HttpRequestModule.get(
      'http://otchi.ovh:3000/',
      (result: string) => {
        const applications = JSON.parse(result).applications as Application[];
        setPage(<Dashboard apps={applications} />);
      },
      () => setPage(<StartServer />),
    );
  }, []);

  return <Text>Vérification de l'état du serveur</Text>;
};
