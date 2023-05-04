import {useState} from 'react';
import {Image, View} from 'react-native';
import {ActivityIndicator, IconButton, Surface, Text} from 'react-native-paper';
import {Vol} from '../Declarations';
import {AxiosClient} from '../../../../../Utils/AxiosClient';

type CarouselType = {
  vols: Vol[];
  addVol: (chestId: number) => void;
  deleteVol: (chestId: number) => void;
};

function Carousel({vols, addVol, deleteVol}: CarouselType): JSX.Element {
  const [actualVol, setActualVol] = useState<number>(0);

  const nextChest = () => {
    setActualVol(prevVol => {
      if (prevVol + 1 < vols.length) return prevVol + 1;
      else return 0;
    });
  };

  const prevChest = () => {
    setActualVol(prevVol => {
      if (prevVol > 0) return prevVol - 1;
      else return vols.length - 1;
    });
  };

  let touchX = 0;

  if (vols.length === 0) return <ActivityIndicator animating={true} />;
  else
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch'}}>
        <Surface
          elevation={3}
          style={{borderRadius: 10}}
          onTouchStart={e => (touchX = e.nativeEvent.pageX)}
          onTouchEnd={e => {
            if (touchX - e.nativeEvent.pageX > 20) nextChest();
            else if (touchX - e.nativeEvent.pageX < -20) prevChest();
          }}>
          <Text variant="titleLarge" style={{margin: 20}}>
            {vols[actualVol].chest.name}
          </Text>
          <View
            style={{
              margin: 20,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'stretch',
            }}>
            <Image
              style={{width: '100%', height: 250}}
              source={{uri: vols[actualVol].chest.image}}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginBottom: 20,
            }}>
            <IconButton
              icon="minus"
              mode="outlined"
              onPress={() => deleteVol(vols[actualVol].chest.id)}
            />
            <Text style={{textAlign: 'center'}} variant="headlineLarge">
              {vols[actualVol].count}
            </Text>
            <IconButton
              icon="plus"
              mode="contained"
              onPress={() => addVol(vols[actualVol].chest.id)}
            />
          </View>
        </Surface>
      </View>
    );
}

export default Carousel;
