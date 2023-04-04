import {View, Text, StyleSheet, NativeModules} from 'react-native';
import {useEffect} from 'react';

export default () => {
  useEffect(() => {
    const {HttpRequestModule} = NativeModules;
    HttpRequestModule.get(
      'http://otchi.ovh:3000/',
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
