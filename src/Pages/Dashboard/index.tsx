import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import AppContext from '../../AppContext';
import Application from '../../Models/Application';
import AppLayout from './Components/AppLayout';

export default ({navigation}: any): JSX.Element => {
  const {apps} = useContext(AppContext);

  const onItemPress = (app: Application) => {
    if (app.isContainer) navigation.navigate('ContainerApplication', {app});
    else navigation.navigate('CustomApplication', {app});
  };

  return (
    <FlatList
      data={apps}
      renderItem={({item}) => <AppLayout item={item} onPress={onItemPress} />}
      keyExtractor={app => app.name}
      numColumns={2}
      style={{flex: 1}}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    />
  );
};
