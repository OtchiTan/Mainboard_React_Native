import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AppStatus, Application} from '../../../Models/Application';

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
          borderColor:
            item.status === AppStatus.OFFLINE
              ? 'red'
              : item.status === AppStatus.ONLINE
              ? 'green'
              : 'yellow',
          borderWidth: item.isContainer ? 1 : 0,
          width: width * 0.45,
          ...styles.item,
        },
      ]}>
      <View style={styles.container}>
        {item.image && (
          <Image source={{uri: item.image}} style={styles.image} />
        )}
        <Text>{item.name}</Text>
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
  },
  item: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 10,
    borderRadius: 100,
  },
  image: {
    width: 50,
    height: 50,
  },
});
