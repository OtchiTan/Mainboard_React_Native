import {BackHandler, Text, View} from 'react-native';
import Application from '../../Models/Application';

export default ({navigation, route}: any): JSX.Element => {
  const {app} = route.params as {app: Application};
  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('Dashboard');
    return true;
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{app.name}</Text>
    </View>
  );
};
