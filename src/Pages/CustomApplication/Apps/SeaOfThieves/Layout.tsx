import {Image, StyleSheet, Text, View} from 'react-native';
import {Vol} from './Declarations';
import {useState} from 'react';
import {AxiosClient} from '../../../../Utils/AxiosClient';
import {IconButton} from 'react-native-paper';

type ILayout = {
  vol: Vol;
};

export default ({vol}: ILayout) => {
  const [actualVol, setActualVol] = useState<Vol>(vol);

  const addVol = () => {
    new AxiosClient()
      .post<Vol>('sot/vols', {chestId: vol.chest.id})
      .then(({data}) => {
        setActualVol(data);
      })
      .catch(err => {});
  };

  const deleteVol = () => {
    new AxiosClient()
      .delete<Vol>('sot/vols/' + vol.chest.id)
      .then(({data}) => {
        setActualVol(data);
      })
      .catch(err => {});
  };

  return (
    <View style={styles.container}>
      <IconButton icon="minus" mode="outlined" onPress={deleteVol} />
      <Image
        source={{uri: actualVol.chest.image}}
        style={{height: 50, width: 50}}
      />
      <Text>{actualVol.count}</Text>
      <IconButton icon="plus" mode="contained" onPress={addVol} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
