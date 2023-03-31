import {useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Application from '../../../Models/Application';

type IAppLayout = {
  item: Application;
};

export default ({item}: IAppLayout) => {
  const onPress = () => {
    console.log('Press');
  };

  var width = Dimensions.get('window').width;

  return (
    <Pressable
      onPress={onPress}
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
    margin: 5,
  },
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  image: {
    width: 50,
    height: 50,
  },
});
