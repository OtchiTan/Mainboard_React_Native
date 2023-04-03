import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Application from '../../../Models/Application';

type IAppLayout = {
  item: Application;
  onPress: (app: Application) => void;
};

export default ({item, onPress}: IAppLayout) => {
  const onPressCallback = () => {
    onPress(item);
  };

  var width = Dimensions.get('window').width;

  return (
    <Pressable
      onPress={onPressCallback}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'black' : 'white',
          margin: 10,
          width: width * 0.4,
          ...styles.item,
        },
      ]}>
      <View style={styles.container}>
        {item.image && (
          <Image source={{uri: item.image}} style={styles.image} />
        )}
        <Text>
          {item.name} | {item.isOn ? 'On' : 'Off'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 5,
  },
  item: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  image: {
    width: 50,
    height: 50,
  },
});
