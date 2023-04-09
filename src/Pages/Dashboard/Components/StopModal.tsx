import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import HttpClient, {HttpErrorCause} from '../../../Utils/HttpClient';
import {useContext} from 'react';
import AppContext from '../../../AppContext';

type ResponseAPI = {};

export default (): JSX.Element => {
  const {width, height} = Dimensions.get('screen');
  const {onNeedLogin, navigator} = useContext(AppContext);

  const handleStop = () => {
    const httpClient = new HttpClient<ResponseAPI>();
    httpClient.get('shutdown').catch(error => {
      if ((error as HttpErrorCause) === 'UNAUTHORIZED') onNeedLogin(navigator);
      else {
        navigator.navigate('CheckServer');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={{...styles.modal, width: width / 1.5, height: height / 3}}>
        <Text style={styles.text}>Are you sure about that ?</Text>

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
