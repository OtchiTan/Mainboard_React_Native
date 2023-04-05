import {View, Text, StyleSheet, NativeModules} from 'react-native';
import {useEffect, useContext} from 'react';
import AppContext from '../../../../AppContext';

export default () => {
  const {authToken} = useContext(AppContext);

  useEffect(() => {
    const {HttpRequestModule} = NativeModules;
    HttpRequestModule.get(
      'http://otchi.ovh:3000/',
      authToken,
      (response: string) => {},
      () => {},
    );
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
