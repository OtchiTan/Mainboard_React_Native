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
        },
      ]}>
      <View style={styles.container}>
        <Image
          source={require('./minecraft.png')}
          style={{width: 50, height: 50}}
        />
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  pressable: {},
});
