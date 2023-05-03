import {BackHandler, Dimensions} from 'react-native';
import {AxiosClient} from '../../../Utils/AxiosClient';
import {Button, Modal, Portal} from 'react-native-paper';

type ModalType = {
  visible: boolean;
  onClose: () => void;
};

export default ({onClose, visible}: ModalType): JSX.Element => {
  const handleStop = () => {
    new AxiosClient()
      .get('shutdown')
      .then(res => {})
      .catch(error => {});
    BackHandler.exitApp();
  };

  const {width, height} = Dimensions.get('window');

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          alignItems: 'center',
          margin: width / 5,
          height: height / 4,
          borderRadius: 50,
          backgroundColor: 'white',
        }}>
        <Button icon="power" mode="contained" onPress={handleStop}>
          Stop Server
        </Button>
      </Modal>
    </Portal>
  );
};
