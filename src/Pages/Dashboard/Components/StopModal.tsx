import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  BackHandler,
} from 'react-native';
import {AxiosClient} from '../../../Utils/AxiosClient';
import {clearToken} from '../../../Utils/AuthStorage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RoutesList} from '../../../Utils/Declarations';

type ModalType = {
  onClose: () => void;
};

export default ({onClose}: ModalType): JSX.Element => {
  const {width, height} = Dimensions.get('screen');
  const navigation = useNavigation<NavigationProp<RoutesList>>();

  const handleStop = () => {
    new AxiosClient()
      .get('shutdown')
      .then(res => {})
      .catch(error => {});
    BackHandler.exitApp();
  };

  const handleLogout = () => {
    clearToken();
    navigation.navigate('Login');
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.modal, width: width / 1.5, height: height / 3}}>
        <Text style={styles.text}>Are you sure about that ?</Text>
        <View style={styles.buttonContainer}>
          <Button title="Logout" color={'red'} onPress={handleLogout} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Stop" color={'red'} onPress={handleStop} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  modal: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 50,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
