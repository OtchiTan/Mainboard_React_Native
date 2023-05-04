import {View, Text, StyleSheet, NativeModules, FlatList} from 'react-native';
import {useEffect, useContext, useState} from 'react';
import {ResponseAPI, Vol} from './Declarations';
import Layout from './Layout';
import {AxiosClient} from '../../../../Utils/AxiosClient';
import {Button} from 'react-native-paper';
import Carousel from './Carousel';

export default () => {
  const [vols, setVols] = useState<Vol[]>([]);
  const [viewCarousel, setViewCarousel] = useState<boolean>(false);

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
      <Button
        icon="alert"
        mode="contained"
        style={{marginBottom: 40}}
        onPress={() => setViewCarousel(!viewCarousel)}>
        Change View
      </Button>
      {viewCarousel ? (
        <Carousel vols={vols} />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={vols}
          renderItem={({item}) => <Layout vol={item} />}
          keyExtractor={vol => vol.chest.name}
          numColumns={1}
        />
      )}
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
