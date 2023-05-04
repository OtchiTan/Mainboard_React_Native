import {View, Text, StyleSheet, NativeModules, FlatList} from 'react-native';
import {useEffect, useContext, useState} from 'react';
import {ResponseAPI, Vol} from './Declarations';
import Layout from './Layout';
import {AxiosClient} from '../../../../Utils/AxiosClient';
import {Button, ToggleButton} from 'react-native-paper';
import Carousel from './Carousel';

export default () => {
  const [vols, setVols] = useState<Vol[]>([]);
  const [viewCarousel, setViewCarousel] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'carousel' | 'list'>('carousel');

  useEffect(() => {
    new AxiosClient()
      .get<ResponseAPI>('sot/vols')
      .then(({data}) => {
        setVols(data.vols);
      })
      .catch(error => {});
  }, []);

  const addVol = (chestId: number) => {
    new AxiosClient()
      .post<Vol>('sot/vols', {chestId})
      .then(({data}) => {
        let newVols = vols.slice();
        const volIndex = vols.findIndex(vol => vol.chest.id === chestId);
        newVols[volIndex] = data;
        setVols(newVols);
      })
      .catch(err => {});
  };

  const deleteVol = (chestId: number) => {
    new AxiosClient()
      .delete<Vol>('sot/vols/' + chestId)
      .then(({data}) => {
        let newVols = vols.slice();
        const volIndex = vols.findIndex(vol => vol.chest.id === chestId);
        newVols[volIndex] = data;
        setVols(newVols);
      })
      .catch(err => {});
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginBottom: 20,
        }}>
        <ToggleButton.Row
          onValueChange={value => setViewType(value as 'carousel' | 'list')}
          value={viewType}>
          <ToggleButton icon="format-list-bulleted" value="list" />
          <ToggleButton icon="view-carousel" value="carousel" />
        </ToggleButton.Row>
      </View>
      {viewType === 'carousel' ? (
        <Carousel vols={vols} addVol={addVol} deleteVol={deleteVol} />
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
