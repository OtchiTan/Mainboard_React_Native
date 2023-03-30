import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Application from '../../Models/Application';
import AppLayout from './Components/AppLayout';

type IDashboard = {
  apps: Application[];
};

export default ({apps}: IDashboard): JSX.Element => {
  return (
    <FlatList
      data={apps}
      renderItem={AppLayout}
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
