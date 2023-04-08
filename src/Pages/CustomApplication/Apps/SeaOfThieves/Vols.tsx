import {View, Text, StyleSheet, NativeModules} from 'react-native';
import {useEffect, useContext} from 'react';
import AppContext from '../../../../AppContext';
import HttpClient from '../../../../Utils/HttpClient';

type ResponseAPI = {};

export default () => {
  const {authToken, onNeedLogin} = useContext(AppContext);

  useEffect(() => {
    const httpClient = new HttpClient<ResponseAPI>();
    httpClient
      .get('')
      .then(() => {})
      .catch(error => {});
  }, []);

  return (
    <View style={styles.container}>
      <Text>Vols</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
