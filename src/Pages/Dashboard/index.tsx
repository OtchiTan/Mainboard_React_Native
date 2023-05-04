import React, {useContext, useEffect, useState} from 'react';
import {BackHandler, FlatList, StyleSheet, View} from 'react-native';
import AppContext from '../../AppContext';
import {Application} from '../../Models/Application';
import AppLayout from './Components/AppLayout';
import {AxiosClient} from '../../Utils/AxiosClient';
import {NavigationProp} from '@react-navigation/native';
import {RoutesList} from '../../Utils/Declarations';
import {SocketClient} from '../../Utils/SocketClient';
import Appbar from './Components/Appbar';
import {Button, Modal, Portal, useTheme} from 'react-native-paper';
import StopModal from './Components/StopModal';

type ResponseAPI = {
  applications: Application[];
};

export default ({
  navigation,
}: {
  navigation: NavigationProp<RoutesList>;
}): JSX.Element => {
  const {apps, setApps, onNeedLogin} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [socket] = useState<SocketClient>(() => new SocketClient(navigation));

  useEffect(() => {
    const backHandler = () => true;
    BackHandler.addEventListener('hardwareBackPress', backHandler);

    if (apps.length === 0) {
      new AxiosClient()
        .get<ResponseAPI>('')
        .then(({data}) => setApps(data.applications))
        .catch(error => {
          if (error.response.status === 401) onNeedLogin(navigation);
          else console.log('ERROR');
        });
    }

    socket.init(sk => {
      sk.on('applications_update', data => {
        setApps(data.applications);
      });
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
      socket.disconnect();
    };
  }, []);

  const onItemPress = (app: Application) => {
    if (app.containerArgs) navigation.navigate('ContainerApplication', {app});
    else navigation.navigate('CustomApplication', {app});
  };

  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  return (
    <View style={styles.page}>
      <Appbar navigation={navigation} onShowModal={showModal} />

      <StopModal visible={modalVisible} onClose={hideModal} />

      <FlatList
        data={apps}
        renderItem={({item}) => <AppLayout item={item} onPress={onItemPress} />}
        keyExtractor={app => app.name}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {flex: 1},
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
