import {View} from 'react-native';
import Card from './Card';

type CarouselType<T> = {
  items: T[];
};

function Carousel<T>({items}: CarouselType<T>): JSX.Element {
  return (
    <View>
      {items.map(item => (
        <Card item={item} />
      ))}
    </View>
  );
}

export default Carousel;
