import {View} from 'react-native';

type CardType<T> = {
  item: T;
};

function Card<T>({}: CardType<T>): JSX.Element {
  return <View></View>;
}

export default Card;
