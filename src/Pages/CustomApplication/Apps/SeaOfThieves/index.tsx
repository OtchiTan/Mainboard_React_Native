import {View, StyleSheet, FlatList} from 'react-native';
import {useEffect, useState} from 'react';
import {ResponseAPI, Vol} from './Declarations';
import Layout from './Layout';
import {AxiosClient} from '../../../../Utils/AxiosClient';
import {ToggleButton} from 'react-native-paper';
import Carousel from './Carousel';

enum ViewType {
  CAROUSEL = 'CAROUSEL',
  LIST = 'LIST',
}

export default () => {
  const [vols, setVols] = useState<Vol[]>([]);
  const [viewType, setViewType] = useState<ViewType>(ViewType.CAROUSEL);

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
          onValueChange={value => {
            if (value) setViewType(value as ViewType);
          }}
          value={viewType}>
          <ToggleButton icon="format-list-bulleted" value={ViewType.LIST} />
          <ToggleButton icon="view-carousel" value={ViewType.CAROUSEL} />
        </ToggleButton.Row>
      </View>
      {viewType === ViewType.CAROUSEL ? (
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
