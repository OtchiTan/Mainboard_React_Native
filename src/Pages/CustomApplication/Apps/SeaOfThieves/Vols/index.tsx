import {View, Text, StyleSheet, NativeModules, FlatList} from 'react-native';
import {useEffect, useContext, useState} from 'react';
import AppContext from '../../../../../AppContext';
import HttpClient from '../../../../../Utils/HttpClient';
import {ResponseAPI, Vol} from '../Declarations';
import Layout from './Layout';

export default () => {
  const {authToken, onNeedLogin} = useContext(AppContext);
  const [vols, setVols] = useState<Vol[]>([]);

  useEffect(() => {
    const httpClient = new HttpClient<ResponseAPI>();
    httpClient
      .get('sot/vols')
      .then(res => {
        setVols(res.vols);
      })
      .catch(error => {});
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={vols}
        renderItem={({item}) => <Layout vol={item} />}
        keyExtractor={vol => vol.chest.name}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});
