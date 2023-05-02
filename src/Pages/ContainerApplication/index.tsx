import {BackHandler, Button, Image, Text, View} from 'react-native';
import {useState, useContext, useEffect} from 'react';
import {StartAppResponse} from './Declarations';
import AppContext from '../../AppContext';
import {StyleSheet, Dimensions} from 'react-native';
import {AppStatus, Application} from '../../Models/Application';
import {AxiosClient} from '../../Utils/AxiosClient';
import {io} from 'socket.io-client';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RoutesList} from '../../Utils/Declarations';
import {SocketClient} from '../../Utils/SocketClient';

type RouteParam = {app: {app: Application}};

export default ({
  navigation,
  route,
}: {
  navigation: NavigationProp<RoutesList>;
  route: RouteProp<RouteParam>;
}): JSX.Element => {
  const [app, setApp] = useState<Application>(route.params.app);
  const [socket] = useState<SocketClient>(() => new SocketClient(navigation));
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const {setApps, onNeedLogin} = useContext(AppContext);
  const [actualDate, setActualDate] = useState<Date>(new Date());

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('Dashboard');
    return true;
  });

  useEffect(() => {
    socket.init(sk => {
      sk.on('applications_update', data => {
        setApps(data.applications);
        const actualApp = data.applications.find(
          (appToTest: Application) => appToTest.id === app.id,
        );
        if (actualApp) setApp(actualApp);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startApp = () => {
    if (!isStarting) {
      setIsStarting(true);

      const handleServer = async () => {
        const axiosClient = new AxiosClient();
        let action = '';

        switch (app.status) {
          case AppStatus.OFFLINE:
            action = 'start';
            break;
          case AppStatus.ONLINE:
            action = 'stop';
            break;
          default:
            return;
        }

        axiosClient
          .get<StartAppResponse>(`${action}App/${app.id}`)
          .then(({data}) => {
            setApps(data.apps);
            setApp(data.updatedApp);
            setIsStarting(false);
          })
          .catch(error => {
            if (error.response.status === 401) onNeedLogin(navigation);
            else navigation.navigate('StartServer');
          });
      };
      handleServer();
    }
  };

  const {width} = Dimensions.get('window');

  if (app.status === AppStatus.ONLINE) {
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
          {app.status === AppStatus.ONLINE && app.startTime && (
            <Text>{lifeTimeText}</Text>
          )}
        </View>
      </View>
      <View style={styles.startButton}>
        <Button
          title={
            app.status === AppStatus.ONLINE
              ? 'Stop'
              : app.status === AppStatus.OFFLINE
              ? 'Start'
              : 'Starting'
          }
          color={
            app.status === AppStatus.ONLINE
              ? 'red'
              : app.status === AppStatus.OFFLINE
              ? 'green'
              : '#E1AD01'
          }
          onPress={startApp}
          disabled={isStarting || app.status === AppStatus.PENDING}
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
