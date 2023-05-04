import {useEffect, useRef, useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import {Dimensions, View} from 'react-native';
import {Appbar, Menu, Provider} from 'react-native-paper';
import {RoutesList} from '../../../Utils/Declarations';
import {clearToken} from '../../../Utils/AuthStorage';

type AppbarType = {
  navigation: NavigationProp<RoutesList>;
  onShowModal: () => void;
};

export default ({navigation, onShowModal}: AppbarType) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const showModal = () => {
    onShowModal();
    closeMenu();
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () =>
      setMenuVisible(false),
    );

    return () => {
      navigation.removeListener('focus', focusListener);
    };
  }, []);

  const {width} = Dimensions.get('window');

  const logout = () => {
    clearToken();
    navigation.navigate('Login');
  };

  return (
    <Provider>
      <Appbar.Header>
        <Appbar.Content title="" />
        <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      </Appbar.Header>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={{x: width, y: 0}}>
        <Menu.Item onPress={logout} leadingIcon="logout" title="Logout" />
        <Menu.Item
          onPress={showModal}
          leadingIcon="power"
          title="Stop Server"
        />
      </Menu>
    </Provider>
  );
};
