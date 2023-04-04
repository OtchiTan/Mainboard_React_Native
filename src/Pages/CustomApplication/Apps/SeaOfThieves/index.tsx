import {View, Text, StyleSheet, Button} from 'react-native';
import {useState} from 'react';
import Vols from './Vols';
import Speedruns from './Speedruns';

export default () => {
  const [page, setPage] = useState<JSX.Element>(<Vols />);

  return (
    <View style={styles.screen}>
      <View style={styles.head}>
        <Button title="Vols" onPress={() => setPage(<Vols />)} />
        <Button title="Speedruns" onPress={() => setPage(<Speedruns />)} />
      </View>
      {page}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    margin: 20,
  },
  head: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 20,
  },
});
