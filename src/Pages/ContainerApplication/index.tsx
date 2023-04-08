import {
  BackHandler,
  Button,
  Image,
  Text,
  View,
  NativeModules,
} from 'react-native';
import {useState, useContext} from 'react';
import Application from '../../Models/Application';
import {StartAppResponse} from './Declarations';
import AppContext from '../../AppContext';
import {StyleSheet, Dimensions} from 'react-native';
import AxiosClient from '../../Utils/HttpClient';

export default ({route, navigation}: any): JSX.Element => {
  const params = route.params as {app: Application};
  const [app, setApp] = useState<Application>(params.app);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const {setApps, authToken} = useContext(AppContext);
  const [actualDate, setActualDate] = useState<Date>(new Date());

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('Dashboard');
    return true;
  });

  const startApp = () => {
    if (!isStarting) {
      setIsStarting(true);

      const handleServer = async () => {
        // AxiosClient.get(`${app.isOn ? 'stop' : 'start'}App/${app.id}`, {
        //   headers: await getAuthHeader(),
        // })
        //   .then(res => {
        //     setIsStarting(false);
        //     const {apps, updatedApp} = res.data as StartAppResponse;
        //     setApp(updatedApp);
        //     setApps(apps);
        //   })
        //   .catch(err => console.log('Error'));
      };
      handleServer();

      setApp(app => {
        return {
          ...app,
          isOn: !app.isOn,
          startTime: app.isOn ? null : new Date(),
        };
      });
    }
  };

  const {width} = Dimensions.get('window');

  if (app.isOn) {
    setTimeout(() => setActualDate(new Date()), 60000);
  }

  let lifeTimeText = '';

  if (app.startTime) {
    const startTime = new Date(app.startTime).getTime();
    const actualTime = actualDate.getTime();

    const lifeTime = Math.round((actualTime - startTime) / 60000);
    if (lifeTime < 1) lifeTimeText = 'En ligne depuis <1 min';
    else if (lifeTime < 60) lifeTimeText = `En ligne depuis ${lifeTime} min`;
    else {
      const minutes = lifeTime % 60;
      const hours = (lifeTime - minutes) / 60;
      lifeTimeText = `En ligne depuis ${hours} h ${minutes} min`;
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.head}>
        <Image
          source={{uri: app.image}}
          style={{width: width * 0.2, height: width * 0.2}}
        />
        <View style={{...styles.headText, width: width * 0.6}}>
          <Text style={styles.title}>{app.name}</Text>
          {app.isOn && app.startTime && <Text>{lifeTimeText}</Text>}
        </View>
      </View>
      <View style={styles.startButton}>
        <Button
          title={app.isOn ? 'Stop' : 'Start'}
          onPress={startApp}
          disabled={isStarting}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  headText: {
    flexDirection: 'column',
  },
  title: {fontSize: 20},
  startButton: {flex: 2, justifyContent: 'center'},
});
