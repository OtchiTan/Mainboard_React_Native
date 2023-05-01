import {BackHandler, Button, Image, Text, View} from 'react-native';
import {useState, useContext} from 'react';
import {StartAppResponse} from './Declarations';
import AppContext from '../../AppContext';
import {StyleSheet, Dimensions} from 'react-native';
import {AppStatus, Application} from '../../Models/Application';
import {AxiosClient} from '../../Utils/AxiosClient';

export default ({route, navigation}: any): JSX.Element => {
  const params = route.params as {app: Application};
  const [app, setApp] = useState<Application>(params.app);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const {setApps, onNeedLogin} = useContext(AppContext);
  const [actualDate, setActualDate] = useState<Date>(new Date());

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('Dashboard');
    return true;
  });

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

      // setApp(app => {
      //   return {
      //     ...app,
      //     isOn: !app.isOn,
      //     startTime: app.isOn ? null : new Date(),
      //   };
      // });
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
