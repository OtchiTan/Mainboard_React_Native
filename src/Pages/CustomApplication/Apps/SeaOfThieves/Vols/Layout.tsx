import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {Vol} from '../Declarations';
import {useEffect, useState} from 'react';
import HttpClient from '../../../../../Utils/HttpClient';

type ILayout = {
  vol: Vol;
};

export default ({vol}: ILayout) => {
  const [actualVol, setActualVol] = useState<Vol>(vol);

  const addVol = () => {
    new HttpClient<Vol>()
      .post('sot/vols', {chestId: vol.chest.id})
      .then(res => {
        setActualVol(res);
      })
      .catch(err => {});
  };

  const deleteVol = () => {
    new HttpClient<Vol>()
      .delete('sot/vols/' + vol.chest.id)
      .then(res => {
        setActualVol(res);
      })
      .catch(err => {});
  };

  return (
    <View style={styles.container}>
      <Button title="-" color="red" onPress={deleteVol} />
      <Image
        source={{uri: actualVol.chest.image}}
        style={{height: 50, width: 50}}
      />
      <Text>{actualVol.count}</Text>
      <Button title="+" color="green" onPress={addVol} />
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
