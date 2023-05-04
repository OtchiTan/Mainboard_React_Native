import {useState} from 'react';
import {View} from 'react-native';
import {Button, Card, IconButton, Text} from 'react-native-paper';
import {Vol} from '../Declarations';
import {AxiosClient} from '../../../../../Utils/AxiosClient';

type CarouselType = {
  vols: Vol[];
};

function Carousel({vols}: CarouselType): JSX.Element {
  const [actualVol, setActualVol] = useState<Vol>(vols[0]);

  const addVol = () => {
    new AxiosClient()
      .post<Vol>('sot/vols', {chestId: actualVol.chest.id})
      .then(({data}) => {
        setActualVol(data);
      })
      .catch(err => {});
  };

  const deleteVol = () => {
    new AxiosClient()
      .delete<Vol>('sot/vols/' + actualVol.chest.id)
      .then(({data}) => {
        setActualVol(data);
      })
      .catch(err => {});
  };

  return (
    <View style={{flex: 1}}>
      <Card>
        <Card.Title title={actualVol.chest.name} />
        <Card.Cover source={{uri: actualVol.chest.image}} />
        <Card.Content>
          <Text
            style={{textAlign: 'center', marginVertical: 20}}
            variant="titleLarge">
            {actualVol.count}
          </Text>
        </Card.Content>
      </Card>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 50,
        }}>
        <IconButton icon="minus" mode="outlined" onPress={deleteVol} />
        <IconButton icon="plus" mode="contained" onPress={addVol} />
      </View>
    </View>
  );
}

export default Carousel;
