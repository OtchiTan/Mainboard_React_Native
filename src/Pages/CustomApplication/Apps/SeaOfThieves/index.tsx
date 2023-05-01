import {View, Text, StyleSheet, NativeModules, FlatList} from 'react-native';
import {useEffect, useContext, useState} from 'react';
import {ResponseAPI, Vol} from './Declarations';
import Layout from './Layout';
import {AxiosClient} from '../../../../Utils/AxiosClient';

export default () => {
  const [vols, setVols] = useState<Vol[]>([]);

  useEffect(() => {
    new AxiosClient()
      .get<ResponseAPI>('sot/vols')
      .then(({data}) => {
        setVols(data.vols);
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
    margin: 50,
  },
});
